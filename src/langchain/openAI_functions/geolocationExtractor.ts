import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const geolocationExtractor: FunctionDefinition = {
    description: 'parse response geolocation to json object format',
    name: 'geolocationExtractor',
    parameters: {
        properties: {
            geolocation: {
                description: 'contain geolocation of a place contain cordinates and name of the place',
                properties: {
                    latitude: {
                        description: 'latitude value',
                        type: 'number'
                    },
                    longitude: {
                        description: 'longitude value',
                        type: 'number'
                    },
                    place_name: {
                        description: 'location name',
                        type: 'string'
                    }
                },
                type: 'object'
            }
        },
        required: ['geolocation'],
        type: 'object'
    }
}

export type GeolocationResponse = {
    geolocation: {
        latitude: number
        longitude: number
        place_name: string
    }
}
