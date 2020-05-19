import 'dotenv/config';
import joi from 'joi';

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(['development', 'staging', 'production'])
      .required(),
    HTTP_PORT: joi.number().optional(),
    HTTPS_PORT: joi.number().optional(),
    PGDATABASE: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().optional(),
    PGHOST: joi.string().required(),
    PGPORT: joi.number().required()
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) throw new Error(`Config validation error: ${error.message}`);

export default {
  env: process.env.NODE_ENV,
  server: {
    http_port: process.env.HTTP_PORT,
    https_port: process.env.HTTPS_PORT
  },
  database: {
    database: process.env.PGDATABASE || 'database',
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432
  },
  api: {
    prefix: '/api'
  }
};
