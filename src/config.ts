import "dotenv/config"
import { Value } from "@sinclair/typebox/value"
import { Type, Static } from "@sinclair/typebox"

// Define environment variable schema
const EnvSchema = Type.Object({
  // Fastify
  PORT: Type.Number(), // Will convert string to number
})

// Infer TypeScript type from schema
type EnvType = Static<typeof EnvSchema>

// Why are we providing the default value??
// This is not safe. We want to see errors here if env file is bad!!
const rawEnv = {
  // Fastify
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
}

const parsedEnv = (() => {
  // Use TypeBox to validate and ensure correctness
  const result = Value.Decode(EnvSchema, rawEnv)
  return result
})()

// Export the validated, strongly-typed config
export const config: EnvType = parsedEnv
