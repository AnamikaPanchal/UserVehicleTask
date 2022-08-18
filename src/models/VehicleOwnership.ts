import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleOwnership {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({ default: false })
    public isDeleted: Boolean;

    @OneToOne(() => Vehicle, vehicle => vehicle.vehicleOwnership, { onDelete: "CASCADE" })
    @JoinColumn()
    vehicle: Vehicle;

    @ManyToOne(type => User, user => user.vehicleOwnership, { onDelete: 'CASCADE' })
    user: User;
}