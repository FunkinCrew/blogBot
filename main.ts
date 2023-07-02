import { startBot } from "./deps.ts";
import { Bot } from "./first_steps.ts";
import { fileLoader, importDirectory } from "./src/utils/loader.ts";
import { updateApplicationCommands } from "./src/utils/updateCommands.ts";

await Promise.all(
  [
    "./src/commands",
    "./src/events",
  ].map((path) => importDirectory(Deno.realPathSync(path))),
);
await fileLoader();
await updateApplicationCommands();

await startBot(Bot);
