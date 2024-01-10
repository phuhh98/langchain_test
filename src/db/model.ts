import { DataTypes } from 'sequelize'
import { sequelize } from './index'

const Employee = sequelize.define('employees', {
    emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
    },
    hire_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
})

const Department = sequelize.define('departments', {
    dept_no: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        primaryKey: true,
    },
    dept_name: {
        type: DataTypes.STRING(40),
        unique: true,
    },
})

const DeparmentManager = sequelize.define(
    'dept_manager',
    {
        emp_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_no',
            },
        },
        dept_no: {
            type: DataTypes.CHAR(4),
            allowNull: false,
        },
        from_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to_date: {
            type: DataTypes.DATE,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['emp_no', 'dept_no'],
            },
        ],
    }
)

Employee.belongsToMany(Department, {
    through: DeparmentManager,
    onDelete: 'CASCADE',
})
Department.belongsToMany(Employee, {
    through: DeparmentManager,
    onDelete: 'CASCADE',
})

const DepartmentEmployee = sequelize.define(
    'dept_emp',
    {
        emp_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_no',
            },
        },
        dept_no: {
            type: DataTypes.CHAR(4),
            allowNull: false,
            references: {
                model: Department,
                key: 'dept_no',
            },
        },
        from_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['emp_no', 'dept_no'],
            },
        ],
    }
)

Employee.belongsToMany(Department, {
    through: DepartmentEmployee,
    onDelete: 'CASCADE',
})
Department.belongsToMany(Employee, {
    through: DepartmentEmployee,
    onDelete: 'CASCADE',
})

const Title = sequelize.define(
    'titles',
    {
        emp_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_no',
            },
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        from_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['emp_no', 'title', 'from_date'],
            },
        ],
    }
)

Employee.hasMany(Title, { onDelete: 'CASCADE' })

const Salary = sequelize.define(
    'salaries',
    {
        emp_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_no',
            },
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['emp_no', 'from_date'],
            },
        ],
    }
)

Employee.hasMany(Salary, { onDelete: 'CASCADE' })
