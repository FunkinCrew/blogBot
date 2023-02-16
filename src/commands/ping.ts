import { ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { snowflakeToTimestamp } from "../utils/helpers.ts";
import { createCommand } from "./mod.ts";

createCommand({
    name: "ping",
    description: "Ping the bot!",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (b, interaction) => {
        
        console.log("get ping");
        const ping = Date.now() - snowflakeToTimestamp(interaction.id);
        console.log(ping);

        await b.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: `🏓 Pong! ${ping}ms`,
                },
            },
        );
    },
});