import { SystemMessagePromptTemplate } from '@langchain/core/prompts'

export const geoLocationSystemPrompt = SystemMessagePromptTemplate.fromTemplate(`
    You have to find a place keywords from the question and return its geolocation - try to find
	the most relevant country that the place belonged to.
	Result will have the longitude, latitude, place_name and A3 ISO code of that country.
`)
