import { Bot } from "../../first_steps.ts";


export async function updateApplicationCommands() {
    await Bot.helpers.upsertGlobalApplicationCommands(
        Bot.commands
            .filter((command) => !command.devOnly)
            .array(),
    );
}