import Container from "typedi";

import { Router } from "express";

import { CONSTANT } from "../../../CONSTANT";
import VehicleService from '../../../services/vehicle';

const route = Router();

export default (app: Router) => {
    app.use('/vehicle', route);

    route.get(
        '/',
        async (req, res, next) => {
            try {
                const { limit, page } = req.query;
                const vehicleServiceInstance = Container.get(VehicleService);
                //@ts-ignore
                let record = await vehicleServiceInstance.RetrieveAllVehicle(limit, page);
                return res.json({ data: record, message: CONSTANT.VEHICLES_RETRIEVE }).status(201);
            } catch (error) {
                console.log("error=", error);
                return next(error);
            }
        }
    );
}