export default () => ({
  db_url: process.env.DB_URL,
  port: parseInt(process.env.PORT as string, 10) || 3001,
  node_env: process.env.NODE_ENV,
});
