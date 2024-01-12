import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Employee } from './index'

@Entity({ name: 'titles' })
export class Title {
    @PrimaryColumn({ type: 'int' })
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @PrimaryColumn({ type: 'varchar', length: 50, nullable: false })
    title: string

    @PrimaryColumn({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}
