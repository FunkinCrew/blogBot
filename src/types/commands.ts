import { BotClient } from "../../first_steps.ts";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, Interaction } from "../../deps.ts";

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
type BoolOptionalArgumentDefinition = BaseDefinition & {
  name: string;
  type: ApplicationCommandOptionTypes.Boolean;
  choices?: readonly { name: string; value: boolean }[];
  required?: false;
};

export type ArgumentDefinition =
  | StringArgumentDefinition
  | StringOptionalArgumentDefinition
  | BoolOptionalArgumentDefinition;

export interface Command<T extends readonly ArgumentDefinition[]> {
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  options?: T;
  devOnly?: boolean;
  execute: (bot: BotClient, interaction: Interaction) => unknown;
}
