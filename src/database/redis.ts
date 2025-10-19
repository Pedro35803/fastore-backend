import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../env";

import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
  password: REDIS_PASSWORD,
});

const connect = async () => {
  redis.on("connect", (err) => console.log("DB Redis connect whit success"));
  redis.on("error", (err) => console.log("Redis Client Error", err));
  await redis.connect();
};

connect();
