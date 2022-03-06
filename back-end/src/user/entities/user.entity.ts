import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    @IsEmail({message: "Invalid email"})
    email: string;

    @Column()
    @Length(8, 128, {message: "Password must be between 8 and 128 characters long"})
    password: string;

    @Column({default: false})
    verified: boolean;

    @Column({default: false})
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}
