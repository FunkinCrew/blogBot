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
    token: configs.token,
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
