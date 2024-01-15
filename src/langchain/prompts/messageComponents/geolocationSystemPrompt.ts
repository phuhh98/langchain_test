import { SystemMessagePromptTemplate } from '@langchain/core/prompts'

export const geoLocationSystemPrompt =
    SystemMessagePromptTemplate.fromTemplate(`
    You have to find a place keywords from the question and return its geolocation - the most relevant one.
	Result will have the longitude, latitude and place_name of that location
`)
