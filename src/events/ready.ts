import { Bot } from "../../first_steps.ts";

Bot.events.ready = (_, payload) => {
  console.log(`[READY] Shard ID ${payload.shardId} of ${Bot.gateway.lastShardId + 1} shards is ready!`);

  if (payload.shardId === Bot.gateway.lastShardId) {
    botFullyReady();
  }
};

function botFullyReady() {
  console.log("READY BOT IS FULLY ONLINE!");
}
