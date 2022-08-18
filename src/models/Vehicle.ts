import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from "typeorm";
import { VehicleOwnership } from "./VehicleOwnership";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public brand: string;

    @Column({ unique: true, nullable: false })
    public v_number: string;

    @OneToOne((type) => VehicleOwnership, (vehicleOwnership) => vehicleOwnership.vehicle, {
        cascade: true,
        eager: true,
    })
    public vehicleOwnership: VehicleOwnership;
}