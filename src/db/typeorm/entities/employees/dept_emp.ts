import { PrimaryColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import { Employee, Department } from './index'

@Entity({ name: 'dept_emp' })
export class DepartmentEmployee {
    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    emp_no: Employee

    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Department)
    @JoinColumn({ name: 'dept_no' })
    dept_no: Department

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}
