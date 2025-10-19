import { config } from "dotenv";
config();

export const {
  JWT_SECRET,
  BASE_URL, // For security
  PORT,
  EMAIL_SERVICE_SMTP,
  PASS_SERVICE_SMTP,
  HOST_SERVICE_SMTP,
  PORT_SERVICE_SMTP,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

if (!JWT_SECRET) throw new Error("Missing JWT_SECRET env variable");
if (!BASE_URL) throw new Error("Missing BASE_URL env variable");

if (
  !EMAIL_SERVICE_SMTP ||
  !PASS_SERVICE_SMTP ||
  !HOST_SERVICE_SMTP ||
  !PORT_SERVICE_SMTP
)
  throw new Error("Missing variables for email service");

if (!REDIS_HOST && !REDIS_PORT && !REDIS_PASSWORD)
  throw new Error("Missing variables for redis connect service");
