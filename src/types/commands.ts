import { BotClient } from "../../first_steps.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Interaction } from "../../deps.ts";

export interface Command {
    name: string, 
    description: string,
    type: ApplicationCommandTypes,
    options?: ApplicationCommandOption[],
    devOnly?: boolean
    execute: (bot: BotClient, interaction:Interaction) => unknown;
}