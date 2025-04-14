import { getConfig } from './useGetConfig'

export const useGetBaseHeaders = () => {
    const config = getConfig()

    return {
        'X-Api-Key': config.apiKey
    }
}