import { dotenv } from "./deps.ts";

const env = dotenv({export: true});
const token = Deno.env.get("BOT_TOKEN") || "";
const gh = Deno.env.get("GH_KEY") || "";

export interface Config {
    token: string;
    botId: bigint;
}

export const configs = {
    token,
    botId: BigInt(atob(token.split(".")[0])),
    devGuildId: BigInt(Deno.env.get("DEV_GUILD_ID") as string),
    gh
}