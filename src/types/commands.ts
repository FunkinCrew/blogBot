import { BotClient } from "../../first_steps.ts";
import { ApplicationCommandOption, ApplicationCommandOptionTypes, ApplicationCommandTypes, Interaction } from "../../deps.ts";

type BaseDefinition = {
    description: string;
  };
  

// String
type StringArgumentDefinition = BaseDefinition & {
    name: string;
    type: ApplicationCommandOptionTypes.String;
    choices?: readonly { name: string; value: string }[];
    required?: true;
  };
  type StringOptionalArgumentDefinition = BaseDefinition & {
    name: string;
    type: ApplicationCommandOptionTypes.String;
    choices?: readonly { name: string; value: string }[];
    required?: false;
  };

export type ArgumentDefinition = 
  | StringArgumentDefinition
  | StringOptionalArgumentDefinition;

export interface Command<T extends readonly ArgumentDefinition[]> {
    name: string, 
    description: string,
    type: ApplicationCommandTypes,
    options?: T,
    devOnly?: boolean
    execute: (bot: BotClient, interaction:Interaction) => unknown;
}