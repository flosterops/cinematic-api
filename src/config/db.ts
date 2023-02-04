const DB_CONFIG = {
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  db: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export { DB_CONFIG };
