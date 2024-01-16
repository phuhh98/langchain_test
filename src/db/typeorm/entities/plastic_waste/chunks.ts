import { PrimaryColumn, Column, Entity } from 'typeorm'

@Entity({ name: 'chunks' })
export class Chunks {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    id: number

    @Column({ type: 'text', nullable: false })
    string: string

    //     @Column({ type: 'vector', nullable: false })
    //     embedding: number[][]
}
