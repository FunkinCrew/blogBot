import { dotenv } from "./deps.ts";

const env = dotenv({export: true, path: "./.env"});
const token = env.BOT_TOKEN || "";

export interface Config {
    token: string;
    botId: bigint;
}

export const configs = {
    token,
    botId: BigInt(atob(token.split(".")[0])),
    devGuildId: BigInt(env.DEV_GUILD_ID),
}