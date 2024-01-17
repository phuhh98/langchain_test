import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Department, Employee } from './index'

@Entity({ name: 'dept_manager' })
export class DepartmentManager {
    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Department, (department) => department.dept_no)
    @JoinColumn()
    dept_no: Department

    @PrimaryColumn({ type: 'int' })
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}
