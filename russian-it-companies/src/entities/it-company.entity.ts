import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class ItCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}