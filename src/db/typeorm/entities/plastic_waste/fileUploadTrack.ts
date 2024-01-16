import { PrimaryColumn, Column, Entity } from 'typeorm'

@Entity({ name: 'file_upload_track' })
export class FileUploadTrack {
    @PrimaryColumn({ type: 'int', nullable: false })
    id: number

    @Column({ type: 'char', length: 64, nullable: false })
    sha256_hash: string
}
