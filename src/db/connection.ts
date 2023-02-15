import { DB_CONFIG } from '../config/db';
import { Sequelize } from 'sequelize';

export interface IDB {
  Sequelize: typeof Sequelize;
  sequelize: typeof sequelize;
}

const sequelize = new Sequelize(
  DB_CONFIG.db,
  DB_CONFIG.user,
  DB_CONFIG.password,
  {
    host: DB_CONFIG.host,
    dialect: DB_CONFIG.dialect as 'postgres',

    pool: {
      max: DB_CONFIG.pool.max,
      min: DB_CONFIG.pool.min,
      acquire: DB_CONFIG.pool.acquire,
      idle: DB_CONFIG.pool.idle,
    },
  }
);

const db: any = {} as IDB;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import { Show } from '../models/show';
import { Movie } from '../models/movie';
import { Theater } from '../models/theater';
import { Ticket } from '../models/ticket';
import { User } from '../models/user';
import { Rating } from '../models/rating';
import { Seat } from '../models/seat';

db.Show = Show;
db.Movie = Movie;
db.Theater = Theater;
db.Ticket = Ticket;
db.User = User;
db.Rating = Rating;
db.Seat = Seat;

Show.associate(db);
Movie.associate(db);
Theater.associate(db);
Ticket.associate(db);
User.associate(db);
Rating.associate(db);
Seat.associate(db);

const connect = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Successfully connected to DB');
  } catch (e: any) {
    console.log('Failed to connect to DB');
    console.log(e.message);
  }
};

export { db, connect };
