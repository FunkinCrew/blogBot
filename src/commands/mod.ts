import { Bot } from "../../first_steps.ts";
import { ArgumentDefinition, Command } from "../types/commands.ts";

export function createCommand<T extends readonly ArgumentDefinition[]>(command: Command<T>) {
  Bot.commands.set(command.name, command);
}