import { Interaction, ApplicationCommandTypes, InteractionResponseTypes, ApplicationCommandOptionTypes} from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";

createCommand({
    name: "post",
    description: "post a dang blog!",
    type: ApplicationCommandTypes.ChatInput,
    devOnly: true,
    options: [
        {
            name: "title",
            description: "fasd",
            type: ApplicationCommandOptionTypes.String,
            required: true
        }
    ],
    execute: async (b:BotClient, i:Interaction) => {
        await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: "yooo?"
            }
        });
    }
});