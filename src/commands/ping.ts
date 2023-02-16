import { Interaction, ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { snowflakeToTimestamp } from "../utils/helpers.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";


createCommand({
    name: "ping",
    description: "Ping the bot!",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (b:BotClient, interaction:Interaction) => {
        
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