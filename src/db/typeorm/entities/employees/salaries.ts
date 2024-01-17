import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { Employee } from './index'

@Entity({ name: 'salaries' })
export class Salary {
    @PrimaryColumn({ type: 'int' })
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @PrimaryColumn({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'int' })
    salary: number

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}
