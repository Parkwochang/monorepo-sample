import z from "zod";

// ----------------------------------------------------------------------

const appEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"], {
    required_error: "NODE_ENV is required",
    message: "NODE_ENV must be one of 'development', 'production', or 'test'",
  }),

  MS_HOST: z
    .string({
      required_error: "MS_HOST is required",
      invalid_type_error: "MS_HOST must be a string",
    })
    .min(1, { message: "MS_HOST cannot be empty" }),

  MS_PORT: z
    .string({
      required_error: "MS_PORT is required",
      invalid_type_error: "MS_PORT must be a string",
    })
    .min(1)
    .transform((val) => parseInt(val, 10)),
});

const dbEnvSchema = z.object({
  DATABASE_URL: z
    .string({
      required_error: "DATABASE_URL is required",
      invalid_type_error: "DATABASE_URL must be a string",
    })
    .min(1, { message: "DATABASE_URL cannot be empty" }),
});

// ----------------------------------------------------------------------
// ! app config validation

export const validate = (config: Record<string, unknown>) =>
  appEnvSchema.parse(config);

// ! db config validation

export const dbConfigValidate = (config: Record<string, unknown>) =>
  dbEnvSchema.parse(config);
