import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, PORT } from '../config';
import { Sequelize } from 'sequelize';

const conection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  timezone: '-05:00', 
  logging: false
});

export { conection };
