import {
    BotWithCache, 
    BotWithHelpersPlugin,
    createBot, 
    Intents, 
    startBot, 
    enableCachePlugin, 
    enableHelpersPlugin, 
    enableCacheSweepers, 
    enablePermissionsPlugin,
    Collection,
    GatewayIntents
} from "./deps.ts";
import { configs } from "./configs.ts";
import { Command } from "./src/types/commands.ts";

const bot = createBot({
    token: "MTA3NTU0MzE0NDE1MTY2Mjc1NA.GuxHGA.f-3WZvNyCX5mrXgJVu_XflEeHBUvSVXInglAK4",
    botId: configs.botId,
    intents: GatewayIntents.Guilds,
    events: {},
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
    commands: Collection<string, Command>;
}

export const Bot = bot as BotClient;
Bot.commands = new Collection();
