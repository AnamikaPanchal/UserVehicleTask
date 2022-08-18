import Container from "typedi";

import { Router } from "express";

import { CONSTANT } from "../../../CONSTANT";
import UserService from '../../../services/user';

const route = Router();

export default (app: Router) => {
    app.use('/user', route);

    route.get(
        '/user-owned-vehicle/:user_id',
        async (req, res, next) => {
            try {
                const user_id = req.params.user_id;
                const userServiceInstance = Container.get(UserService);
                let record = await userServiceInstance.UserOwnVehicle(user_id);
                return res.json({ data: record, message: CONSTANT.USER_OWN_VEHICLE_RETRIEVE }).status(201);
            } catch (error) {
                console.log("error=", error);
                return next(error);
            }
        }
    );
}