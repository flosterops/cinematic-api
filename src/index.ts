// utils
import express, { Request, Response } from 'express';
import { errorHandler } from './utils/error-handler/error-handler';
import { connect } from './db/connection';
import { PORT } from './config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

// routes
import userRoutes from './routes/user.routes';
import theaterRouter from './routes/theater.routes';
import movieRouter from './routes/movie.routes';
import seatRouter from './routes/seat.routes';
import ratingRouter from './routes/rating.routes';
import ticketRouter from './routes/ticket.routes';
import showRouter from './routes/show.routes';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      version: '1.0',
      title: 'API v1.0',
      description: `API Documentation`,
      servers: [`http://localhost:${PORT}`],
    },
  },
  apis: ['./src/routes/*.ts'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connect();

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.use('/user', userRoutes);
app.use('/theater', theaterRouter);
app.use('/movie', movieRouter);
app.use('/seat', seatRouter);
app.use('/rating', ratingRouter);
app.use('/ticket', ticketRouter);
app.use('/show', showRouter);

app.use(errorHandler); // registration of handler

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
