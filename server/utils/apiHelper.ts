import { getConfig } from './getConfig'

export const getBaseHeaders = () => {
    const config = getConfig()

    return {
        'X-Api-Key': config.apiKey
    }
}