import { ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
    name: "post",
    description: "post a dang blog!",
    type: ApplicationCommandTypes.ChatInput,
    devOnly: true,
    execute: async (b, i) => {
        await b.helpers.sendInteractionResponse(i.id, i.token, {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
                content: "yooo?"
            }
        });
    }
});