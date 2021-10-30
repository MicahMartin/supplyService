import express from 'express';
import log4js from 'log4js';
import dotenv from 'dotenv';
import { initLog, accessLogger, debugLogger } from './util/log';

import StatusRouter from './routes/StatusRouter';
import SupplierRouter from './routes/SupplierRouter';
import TransactionRouter from './routes/TransactionRouter';
import InventoryRouter from './routes/InventoryRouter';


dotenv.config();
initLog();

const server = express();
const port = process.env.PORT_NUM.toUpperCase();

server.use(log4js.connectLogger(accessLogger, { level: 'info' }));
server.use(express.json());

server.use('/v1/suppliers', SupplierRouter);
server.use('/v1/transactions', TransactionRouter);
server.use('/v1/inventories', InventoryRouter);

server.use('/status', StatusRouter);
server.use('/logs', express.static('logs'));

console.info(`rundoo supplier service up on port ${port}`);
debugLogger.info(`rundoo supplier service up on port ${port}`);

server.listen(port);
