import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { VehicleOwnership } from '../models/VehicleOwnership';
@Service()
export default class UserService {
    constructor(
        @InjectRepository(VehicleOwnership) private readonly vehicleOwnershipRepository: Repository<VehicleOwnership>,
    ) { }

    public async UserOwnVehicle(user_id: string) {
        try {
            let userOwnVehicles = await this.vehicleOwnershipRepository
                .createQueryBuilder("vehicleOwnership")
                .leftJoinAndSelect("vehicleOwnership.vehicle", "vehicle")
                .where("vehicleOwnership.user = :userId", { userId: user_id })
                .andWhere("vehicleOwnership.isDeleted = false")
                .getMany();

            return await Promise.all(
                userOwnVehicles.map(async (i) => {
                    return i.vehicle
                })
            );
        } catch (error) {
            console.log("error=", error);
            throw error;
        }
    }
}