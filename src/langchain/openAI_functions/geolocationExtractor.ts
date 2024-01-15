import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const geolocationExtractor: FunctionDefinition = {
    name: 'geolocationExtractor',
    description: 'parse response geolocation to json object format',
    parameters: {
        type: 'object',
        properties: {
            geolocation: {
                type: 'object',
                description:
                    'contain geolocation of a place contain cordinates and name of the place',
                properties: {
                    longitude: {
                        type: 'number',
                        description: 'longitude value',
                    },
                    latitude: {
                        type: 'number',
                        description: 'latitude value',
                    },
                    place_name: {
                        type: 'string',
                        description: 'location name',
                    },
                },
            },
        },
        required: ['geolocation'],
    },
}

export type GeolocationResponse = {
    geolocation: {
        longitude: number
        latitude: number
        place_name: string
    }
}
