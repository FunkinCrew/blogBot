import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Attachment,
  BigString,
  createAppAuth,
  Interaction,
  InteractionResponseTypes,
  Message,
  Octokit,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";
import { configs } from "../../configs.ts";

createCommand({
  name: "postall",
  description: "Posts the entire thread as a single blog post!",
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
    // msgs.last()?.content
    // channel.name

    const privateKeyShit: string = configs.gh as string;
    console.log(privateKeyShit);

    const octo = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: 338014,
        installationId: 37852018,
        privateKey: privateKeyShit,
        type: "installation",
      },
    });

    if (octo != undefined) {
      console.log("Auth'd github properly?");
    }

    const op: Message = msgs.last() as Message;

    console.log(op);

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
      .then((labl) => console.log("created label"));

    // let shit = await octo.orgs.get({
    //   org:"FunkinCrew"
    // });
    // console.log(shit);

    let postBody: string = "";
    msgs.forEach((msg, k, map) => postBody = msg.content + "\n" + postBody); // reversal... lol!

    for (const pic of msgs.last()?.attachments as Attachment[]) {
      if (pic.contentType?.startsWith("image")) {
        postBody += `\n\n![image](${pic.url})`;
      }
    }

    const ytRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/igm;
    postBody = postBody.replaceAll(ytRegex, '{{youtube(id="$6")}}');

    try {
      console.log(username);

      const issueStuff = await octo.issues.create({
        repo: "blog-queue",
        owner: "FunkinCrew",
        title: channel.name as string,
        body: postBody,
        labels: [username],
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
