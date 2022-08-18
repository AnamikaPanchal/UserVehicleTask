import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Vehicle } from '../models/Vehicle';

@Service()
export default class VehicleService {
    constructor(
        @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    ) { }

    public async RetrieveAllVehicle(limit: number = 10, page: number = 1) {
        if (page == 0)
            page = 1;

        let skip = (page - 1) * limit;
        try {
            let vehicles = await this.vehicleRepository
                .createQueryBuilder("vehicle")
                .leftJoinAndSelect("vehicle.vehicleOwnership", "vehicleOwnership")
                .leftJoinAndSelect("vehicleOwnership.user", "user")
                .where("vehicleOwnership.isDeleted = false")
                .select(['vehicle', 'vehicleOwnership',
                    'user.id', 'user.name', 'user.surname', 'user.email', 'user.email', 'user.phone', 'user.location'])
                .take(limit)
                .skip(skip)
                .getMany();

            let countVehicles = await this.vehicleRepository
                .createQueryBuilder("vehicle")
                .leftJoinAndSelect("vehicle.vehicleOwnership", "vehicleOwnership")
                .leftJoinAndSelect("vehicleOwnership.user", "user")
                .where("vehicleOwnership.isDeleted = false")
                .take(limit)
                .skip(skip)
                .getCount();

            const totalPages = Math.ceil(countVehicles / limit);
            const currentPage = page;
            const currentPageRecords = vehicles.length;
            // check if last page
            let isLastPage = true
            if ((countVehicles / limit) > page) {
                isLastPage = false
            }

            let response = {
                vehicles,
                totalPages: totalPages,
                currentPage: currentPage,
                currentPageRecords: currentPageRecords,
                isLastPage
            }
            return response;
        } catch (error) {
            console.log("error=", error);
            throw error;
        }
    }
}