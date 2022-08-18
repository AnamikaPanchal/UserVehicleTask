import Container from 'typedi';
import 'reflect-metadata';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config';
import { Connection, createConnection, useContainer } from 'typeorm';
import { User } from '../models/User';
import { Vehicle } from '../models/Vehicle';
import { VehicleOwnership } from '../models/VehicleOwnership';

export default async (): Promise<Connection> => {
    const connectionOptions: PostgresConnectionOptions = {
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        synchronize: true,
        logging: false,
        extra: {
            connectionLimit: 90,
        },
        entities: [
            User,
            Vehicle,
            VehicleOwnership
        ],
        subscribers: [],
    };

    useContainer(Container, { fallbackOnErrors: true });

    const connection = await createConnection(connectionOptions);

    return connection;
};