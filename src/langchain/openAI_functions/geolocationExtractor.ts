import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const geolocationExtractor: FunctionDefinition = {
    description: 'parse response geolocation to json object format',
    name: 'geolocationExtractor',
    parameters: {
        properties: {
            geolocation: {
                description: 'contain geolocation of a place contain cordinates and name of the place',
                properties: {
                    ISO_A3: {
                        description: 'A3 ISO code of the country that this place belonged to',
                        type: 'string'
                    },
                    lat: {
                        description: 'latitude value',
                        type: 'number'
                    },
                    lng: {
                        description: 'longitude value',
                        type: 'number'
                    },
                    place_name: {
                        description: 'the place name',
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
        ISO_A3: string
        lat: number
        lng: number
        place_name: string
    }
}
