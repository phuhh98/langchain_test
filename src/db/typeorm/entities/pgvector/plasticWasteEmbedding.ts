import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'plastic_waste_chunks' })
export class PlasticWasteEmbedding {
    @Column({ nullable: false, type: 'text' })
    content: string

    @Column({ nullable: false, type: 'text' })
    embedding: string

    @PrimaryColumn({ nullable: false, type: 'bigint' })
    id: bigint

    @Column({ type: 'json' })
    metadata: { original_document_id: number }
}
