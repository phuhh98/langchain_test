import { DataSource } from 'typeorm'
import {
    Department,
    DepartmentEmployee,
    DepartmentManager,
    Employee,
    Salary,
    Title,
} from './entities/employees'

export const employeeDataSource = new DataSource({
    type: 'mysql',
    database: 'employees',
    username: 'root',
    password: 'admin',
    entities: [
        Employee,
        Department,
        DepartmentEmployee,
        DepartmentManager,
        Title,
        Salary,
    ],
    host: '127.0.0.1',
    port: 3306,
})
