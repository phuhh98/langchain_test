import {
    PrimaryColumn,
    Column,
    Unique,
    Entity,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'

@Entity({ name: 'employees' })
export class Employee {
    @PrimaryColumn({ type: 'int', nullable: false })
    emp_no: number

    @Column({ type: 'timestamptz', nullable: false })
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

@Entity({ name: 'departments' })
@Unique(['dept_name'])
export class Department {
    @PrimaryColumn({ type: 'char', length: 4, nullable: false })
    dept_no: string

    @Column({ type: 'varchar', length: 40, nullable: false })
    dept_name: string
}

@Entity({ name: 'dept_manager' })
export class DepartmentManager {
    @PrimaryColumn()
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    emp_no: Employee

    @PrimaryColumn()
    @ManyToOne(() => Department, (department) => department.dept_no)
    dept_no: Department

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}

@Entity({ name: 'dept_emp' })
export class DepartmentEmployee {
    @PrimaryColumn()
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    emp_no: Employee

    @PrimaryColumn()
    @ManyToOne(() => Department, (department) => department.dept_no)
    dept_no: Department

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}

@Entity({ name: 'titles' })
export class Title {
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ type: 'varchar', length: 50, nullable: false })
    title: string

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}

@Entity({ name: 'salaries' })
export class Salary {
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ type: 'int', nullable: false })
    salary: number

    @Column({ type: 'date', nullable: false })
    from_date: Date

    @Column({ type: 'date', nullable: false })
    to_date: Date
}
