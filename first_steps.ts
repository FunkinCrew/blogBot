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
    Collection
} from "./deps.ts";
import { dotenv } from "./deps.ts";
import { Command } from "./src/types/commands.ts";

dotenv({ export: true });

const bot = createBot({
    token: Deno.env.get("DISCORD_TOKEN"),
    intents: Intents.Guilds | Intents.GuildMessages,
    events: {
        ready() {
            console.log("Successfully connected to gateway");
        },
        
    },
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

await startBot(bot);