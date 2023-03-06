import { Interaction, ApplicationCommandTypes, InteractionResponseTypes, ApplicationCommandOptionTypes, MessageComponentTypes, ButtonComponent, ActionRow, TextStyles, BigString} from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";
import { Octokit } from "npm:@octokit/rest";
import { configs } from "../../configs.ts"

createCommand({
    name: "post",
    description: "post a dang blog!",
    type: ApplicationCommandTypes.ChatInput,
    devOnly: true,
    // options: [
    //     {
    //         name: "title",
    //         description: "fasd",
    //         type: ApplicationCommandOptionTypes.String,
    //         required: true
    //     }
    // ],
    execute: async (b:BotClient, i:Interaction) => {

        // console.log(i);
        const msgs = await b.helpers.getMessages(i.channelId as bigint);
        const channel = await b.helpers.getChannel(msgs.first()?.channelId as BigString)
        // msgs.last()?.content
        // channel.name

        const octo = new Octokit({
          auth: configs.gh
        });

        let username:string = i.member?.nick as string;
        if (username == undefined)
          username = i.member?.user?.username as string;

        const authorTag = await octo.issues.createLabel({
          repo: "blog-queue",
          owner: "FunkinCrew",
          name: username
        })
          .catch(reason => {console.log(reason)})
          .then(_ => console.log("created label"));

        // let shit = await octo.orgs.get({
        //   org:"FunkinCrew"
        // });
        // console.log(shit);
        const issueStuff = await octo.issues.create({
          repo:"blog-queue",
          owner:"FunkinCrew",
          title: channel.name as string,
          body: msgs.last()?.content,
          labels: [username]
        });


        await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: `Posted to the Funkin' Blog Queue!
https://github.com/FunkinCrew/blog-queue/issues/${issueStuff.data.number}`
            }
        });
    }
});