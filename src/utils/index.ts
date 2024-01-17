import { BinaryLike, createHash } from 'node:crypto'

export function createSHA256(data: BinaryLike) {
    return createHash('sha256').update(data).digest('hex')
}

export const splitIntoBatches = <T>(arrayData: Array<T>, batchSize: number = process.env.MAX_EMBEDDING_BATCH_SIZE) => {
    const arrayLength = arrayData.length

    const devidedBatches: T[][] = []

    for (let i = 0; i <= arrayLength; i += batchSize) {
        const START_INDEX = i
        const END_INDEX = i + batchSize > arrayLength ? undefined : i + batchSize
        devidedBatches.push(arrayData.slice(START_INDEX, END_INDEX))
    }

    return devidedBatches
}
