import { PrimaryColumn, Column, Entity } from 'typeorm'

@Entity({ name: 'employees' })
export class Employee {
    @PrimaryColumn({ type: 'int', nullable: false })
    emp_no: number

    @Column({ type: 'date', nullable: false })
    birth_date: Date

    @Column({ type: 'varchar', length: 14, nullable: false })
    first_name: string

    @Column({ type: 'varchar', length: 16, nullable: false })
    last_name: string

    @Column({ type: 'enum', enum: ['M', 'F'], nullable: false })
    gender: string

    @Column({ type: 'date', nullable: false })
    hire_date: Date
}
