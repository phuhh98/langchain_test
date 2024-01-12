import { PrimaryColumn, Column, Unique, Entity } from 'typeorm'

@Entity({ name: 'departments' })
@Unique(['dept_name'])
export class Department {
    @PrimaryColumn({ type: 'char', length: 4, nullable: false })
    dept_no: string

    @Column({ type: 'varchar', length: 40, nullable: false })
    dept_name: string
}
