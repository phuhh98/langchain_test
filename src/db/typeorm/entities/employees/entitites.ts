import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Unique } from 'typeorm'

@Entity({ name: 'employees' })
export class Employee {
    @Column({ nullable: false, type: 'timestamptz' })
    birth_date: Date

    @PrimaryColumn({ nullable: false, type: 'int' })
    emp_no: number

    @Column({ length: 14, nullable: false, type: 'varchar' })
    first_name: string

    @Column({ enum: ['M', 'F'], nullable: false, type: 'enum' })
    gender: string

    @Column({ nullable: false, type: 'date' })
    hire_date: Date

    @Column({ length: 16, nullable: false, type: 'varchar' })
    last_name: string
}

@Entity({ name: 'departments' })
@Unique(['dept_name'])
export class Department {
    @Column({ length: 40, nullable: false, type: 'varchar' })
    dept_name: string

    @PrimaryColumn({ length: 4, nullable: false, type: 'char' })
    dept_no: string
}

@Entity({ name: 'dept_manager' })
export class DepartmentManager {
    @PrimaryColumn()
    @ManyToOne(() => Department, (department) => department.dept_no)
    dept_no: Department

    @PrimaryColumn()
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}

@Entity({ name: 'dept_emp' })
export class DepartmentEmployee {
    @PrimaryColumn()
    @ManyToOne(() => Department, (department) => department.dept_no)
    dept_no: Department

    @PrimaryColumn()
    @ManyToOne(() => Employee, (employee) => employee.emp_no)
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}

@Entity({ name: 'titles' })
export class Title {
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ length: 50, nullable: false, type: 'varchar' })
    title: string

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}

@Entity({ name: 'salaries' })
export class Salary {
    @OneToOne(() => Employee, (employee) => employee.emp_no)
    @JoinColumn()
    emp_no: Employee

    @Column({ nullable: false, type: 'date' })
    from_date: Date

    @Column({ nullable: false, type: 'int' })
    salary: number

    @Column({ nullable: false, type: 'date' })
    to_date: Date
}
