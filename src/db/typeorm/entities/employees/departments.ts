import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'

@Entity({ name: 'departments' })
@Unique(['dept_name'])
export class Department {
    @Column({ length: 40, nullable: false, type: 'varchar' })
    dept_name: string

    @PrimaryColumn({ length: 4, nullable: false, type: 'char' })
    dept_no: string
}
