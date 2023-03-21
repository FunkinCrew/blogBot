import { Interaction, ApplicationCommandTypes, InteractionResponseTypes, createScheduledEvent } from "../../deps.ts";
import { BotClient } from "../../first_steps.ts";
import { createCommand } from "./mod.ts";
import { ScheduledEventEntityType } from "../../deps.ts";

createCommand({
    name: "weekly",
    description: "Creates the weekly event easily for next monday, lol!",
    type: ApplicationCommandTypes.ChatInput,
    execute: async (b:BotClient, i:Interaction) => {
        
        // shoutouts chatgpt lol!
       // Get current date and time in EST
        const now = new Date();
        const estOffset = -5 * 60; // offset in minutes (EST is UTC-5)
        const estTime = new Date(now.getTime() + estOffset * 60 * 1000);

        // Calculate timestamp of next Monday at 1PM EST
        const nextMonday = new Date();
        nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7)); // get next Monday
        nextMonday.setHours(13, 0, 0, 0); // set time to 1PM EST
        nextMonday.setMinutes(nextMonday.getMinutes() - estTime.getTimezoneOffset()); // adjust for timezone

        const nextMondayTimestamp = nextMonday.getTime(); // timestamp in milliseconds
        console.log(nextMondayTimestamp);

        await b.helpers.createScheduledEvent(i.guildId as unknown as string, {
            name: "WEEKLY MONDAYS!",
            description: "the classic... yall know what it is...",
            entityType: ScheduledEventEntityType.Voice,
            scheduledStartTime: nextMondayTimestamp,
            channelId: "985673293795311646" // fuck it, hardcoded
        });

        // await b.helpers.createScheduledEvent(b, i.guildId as unknown as string, {
        //     name: "WEEKLY MONDAYS!",
        //     description: "the classic... yall know what it is...",
        //     entityType: ScheduledEventEntityType.Voice,
        //     scheduledStartTime: nextMondayTimestamp
        // });

        await b.helpers.sendPrivateInteractionResponse(
            i.id,
            i.token,
            {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: "weekly lol!"
                }
            }
        );
    }
})