import * as express from 'express';
import 'reflect-metadata';
import server from './server';
import database from './database';

export default async (app: express.Application) => {
    await database();
    console.log("DB loaded and connected!");
    await server(app);
    console.log("Server loaded!")
};