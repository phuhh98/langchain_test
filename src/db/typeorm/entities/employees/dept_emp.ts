import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Department, Employee } from './index'

@Entity({ name: 'dept_emp' })
export class DepartmentEmployee {
    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Department)
    @JoinColumn({ name: 'dept_no' })
    dept_no: Department

    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}
