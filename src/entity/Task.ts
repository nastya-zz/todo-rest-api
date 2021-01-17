import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {ITask} from "../interfaces/ITask";

@Entity()
export class Task implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @Column()
    date: string;

    @Column()
    done: boolean;
}