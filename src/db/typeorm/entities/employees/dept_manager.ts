import { PrimaryColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import { Employee, Department } from './index'

@Entity({ name: 'dept_manager' })
export class DepartmentManager {
    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Department, (department) => department.dept_no)
    @JoinColumn()
    dept_no: Department

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}
