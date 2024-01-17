import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'employees' })
export class Employee {
    @Column({ nullable: false, type: 'date' })
    birth_date: Date

    @PrimaryColumn({ nullable: false, type: 'int' })
    emp_no: number

    @Column({ length: 14, nullable: false, type: 'varchar' })
    first_name: string

    @Column({ enum: ['M', 'F'], nullable: false, type: 'enum' })
    gender: string

    @Column({ nullable: false, type: 'date' })
    hire_date: Date

    @Column({ length: 16, nullable: false, type: 'varchar' })
    last_name: string
}
