import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity("todos")
export class Todo extends BaseEntity {
    
    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id?: string;

    @Column({ type: "string" })
    content?: string;

    @Column({ type:'bool', default: 'FALSE' })
    isCompleted: boolean = false;
}