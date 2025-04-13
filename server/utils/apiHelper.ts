import { getConfig } from './getConfig'

export const getBaseHeaders = () => {
    const config = getConfig()

    if (config.appSsrDebug) {
        console.log('Получение базовых заголовков')
        console.log('Используем API ключ:', config.apiKey)
    }
    return {
        'X-Api-Key': config.apiKey
    }
}