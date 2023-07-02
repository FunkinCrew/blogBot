import { dotenv } from "./deps.ts";

dotenv({ export: true });
const token = Deno.env.get("BOT_TOKEN") || "";
const gh = Deno.env.get("GH_KEY") || "";
const devGuildId = Deno.env.get("DEV_GUILD_ID") || "";

export const configs = {
  token,
  botId: BigInt(atob(token.split(".")[0])),
  devGuildId,
  gh,
};
