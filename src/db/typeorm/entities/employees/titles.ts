import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { Employee } from './index'

@Entity({ name: 'titles' })
export class Title {
    @PrimaryColumn({ type: 'int' })
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @PrimaryColumn({ nullable: false, type: 'date' })
    from_date: Date

    @PrimaryColumn({ length: 50, nullable: false, type: 'varchar' })
    title: string

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}
