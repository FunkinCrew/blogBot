import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Attachment,
  BigString,
  Interaction,
  InteractionResponseTypes,
  Octokit,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { BotClient } from "../../first_steps.ts";
import { configs } from "../../configs.ts";

createCommand({
  name: "octotest",
  description: "tests the connection to the Github API",
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  execute: async (b: BotClient, i: Interaction) => {
    const octo = new Octokit({
      auth: configs.gh,
    });

    const {
      data: { login },
    } = await octo.rest.users.getAuthenticated();
    console.log("Hello, %s", login);

    await b.helpers.sendInteractionResponse(i.id, i.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: { content: "Hello " + login },
    });

    if (octo != undefined) {
      console.log("Auth'd github properly?");
      octo.repos.listForOrg({ org: "FunkinCrew", type: "private" }).then((res) => {
        console.log(res.data.reduce((acc, val) => acc + val.name + "\n\t", ""));
      });
    }
  },
});
