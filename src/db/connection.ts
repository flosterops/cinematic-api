import { DB_CONFIG } from '../config/db';
import { Sequelize } from 'sequelize';

export interface IDB {
  Sequelize: typeof Sequelize;
  sequelize: typeof sequelize;
}

const sequelize = new Sequelize(DB_CONFIG.db, DB_CONFIG.user, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: DB_CONFIG.dialect as 'postgres',

  pool: {
    max: DB_CONFIG.pool.max,
    min: DB_CONFIG.pool.min,
    acquire: DB_CONFIG.pool.acquire,
    idle: DB_CONFIG.pool.idle,
  },
});

const db: IDB = {} as IDB;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const connect = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Successfully connected to DB');
  } catch (e: any) {
    console.log('Failed to connect to DB');
    console.log(e.message);
  }
};

export { db, connect };
