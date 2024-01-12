import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm'

import { Employee } from './index'

@Entity({ name: 'salaries' })
export class Salary {
    @PrimaryColumn({ type: 'int' })
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ type: 'int', nullable: false })
    salary: number

    @PrimaryColumn({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}
