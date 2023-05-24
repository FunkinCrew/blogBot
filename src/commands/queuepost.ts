import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Attachment,
  BigString,
  Interaction,
  InteractionResponseTypes
} from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";
import { Octokit } from "../../deps.ts";
import { configs } from "../../configs.ts";
import { Message } from "../../deps.ts";

createCommand({
  name: "queuepost",
  description: "queues a post to Funkin' blog!!",
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  options: [
    {
      name: "debug",
      description: "doesn't actually posts to the blog!",
      type: ApplicationCommandOptionTypes.Boolean,
      required: false,
    },
  ],
  execute: async (b: BotClient, i: Interaction) => {
    // console.log(i);
    const msgs = await b.helpers.getMessages(i.channelId as bigint);
    const channel = await b.helpers.getChannel(msgs.first()?.channelId as BigString);

    const octo = new Octokit({
      auth: configs.gh,
    });

    if (octo != undefined) {
      console.log("Auth'd github properly?");
    }

    const op: Message = msgs.last() as Message;
    const memb = await b.helpers.getMember(channel.guildId as BigString, op.authorId);

    let username: string = memb.nick as string;
    if (username == undefined) {
      username = memb.user?.username as string;
    }

    const authorTag = await octo.issues.createLabel({
      repo: "blog-queue",
      owner: "FunkinCrew",
      name: username,
    })
      .catch((reason) => {
        console.log(reason);
      })
      .then((_) => console.log("created label"));

    let postBody = msgs.last()?.content as string;

    for (const pic of msgs.last()?.attachments as Attachment[]) {
      if (pic.contentType?.startsWith("image")) {
        postBody += `\n\n![image](${pic.url})`;
      }
    }

    const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/igm;
    postBody = postBody.replaceAll(ytRegex, "{{youtube(id=\"$6\")}}");


    try {
      console.log(username);

      const issueStuff = await octo.issues.create({
        repo: "blog-queue",
        owner: "FunkinCrew",
        title: channel.name as string,
        body: postBody,
        labels: [username],
      });

      await octo.issues.update({
        repo: "blog-queue",
        owner: "FunkinCrew",
        issue_number: issueStuff.data.number,
        state: "closed"
      });

      await b.helpers.sendInteractionResponse(i.id, i.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Posted to the Funkin' Blog Queue!
  https://github.com/FunkinCrew/blog-queue/issues/${issueStuff.data.number}`,
        },
      });

    } catch (e) {
      console.log("busted creating the issue!");
      console.log(e);
      await b.helpers.sendInteractionResponse(i.id, i.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "Error creating issue! \n```\n" + e + "\n```",
        },
      });

      throw e;
    }
  },
});
