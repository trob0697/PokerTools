import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class Chart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    owner_id: number;

    @Column()
    name: string;

    @Column()
    tabs: string;

    @Column()
    data: string;
}