import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { VehicleOwnership } from "./VehicleOwnership";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public surname: string;

    @Column({ unique: true, nullable: true })
    public email: string;

    @Column({ nullable: false })
    public phone: string;

    @Column({ nullable: true })
    public location: string;

    @OneToMany((type) => VehicleOwnership, (vehicleOwnership) => vehicleOwnership.user, { cascade: true })
    public vehicleOwnership: VehicleOwnership[];
}