import { Bot } from "../../first_steps.ts";
import { InteractionTypes } from "../../deps.ts";

Bot.events.interactionCreate = (_, interaction) => {
    if (!interaction.data) return;

    switch (interaction.type) {
        case InteractionTypes.ApplicationCommand:
            console.log(`[Applicatoin command] ${interaction.data.name} command executed.`);
            Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction);
            break;
    }
};