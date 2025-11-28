import * as dotenv from 'dotenv';
dotenv.config();
export default {
  db_url: process.env.DB_URL,
  port: parseInt(process.env.PORT as string, 10) || 3001,
  node_env: process.env.NODE_ENV,
  jwt: {
    access_token: process.env.ACCESS_TOKEN,
  },
};
