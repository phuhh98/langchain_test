import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'

@Entity({ name: 'original_document' })
@Unique(['sha256_hash'])
export class OriginalDocument {
    @PrimaryColumn({ nullable: false, type: 'int' })
    id: number

    @Column({ type: 'json' })
    metadata: object

    @Column({ length: 64, nullable: false, type: 'char' })
    sha256_hash: string
}
