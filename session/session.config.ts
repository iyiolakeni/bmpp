import session from 'express-session';
import { INestApplication } from '@nestjs/common';

export const sessionConfig = (app: INestApplication) => {
  app.use(
    session({
      secret: 'QWERTYalpha##32%%bEtAkrmison',
      resave: false,
      saveUninitialized: false,
    }),
  );
};
