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
        let msgs = await b.helpers.getMessages(i.channelId as bigint);
        let channel = await b.helpers.getChannel(msgs.first()?.channelId as BigString)
        // msgs.last()?.content
        // channel.name

        let octo = new Octokit({
          auth: configs.gh
        });

        // let shit = await octo.orgs.get({
        //   org:"FunkinCrew"
        // });
        // console.log(shit);
        let issueStuff = await octo.issues.create({
          repo:"blog-queue",
          owner:"FunkinCrew",
          title: channel.name as string,
          body: msgs.last()?.content
        });


        await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: `Posted to the Funkin' Blog Queue!
                https://github.com/FunkinCrew/blog-queue/issues/${issueStuff.data.number}`;
            }
        });
    }
});