import type { RequestHeaders } from 'h3'

type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'

export const apiClient = async (
    url: string,
    method?: HttpMethod,
    body: any = null,
    extraHeaders?: RequestHeaders
) => {
    const config = getConfig()
    try {
        if (config.appSsrDebug) {
            console.log('Запрос отправляется с параметрами:')
            console.log('URL:', url)
            console.log('Метод:', method)

            console.log('Базовые заголовки:', getBaseHeaders())
            console.log('Дополнительные заголовки:', extraHeaders)
        }

        const blockedHeaders = [
            'sec-ch-ua',
            'sec-ch-ua-platform',
            'sec-ch-prefers-color-scheme',
            'sec-ch-ua-mobile'
        ]

        const filteredExtraHeaders = Object.fromEntries(
            Object.entries(extraHeaders || {}).filter(
                ([key]) => !blockedHeaders.includes(key)
            )
        )
        if (config.appSsrDebug) {
            console.log('Отфильтрованные заголовки:', filteredExtraHeaders)
        }

        const headers = {
            ...getBaseHeaders(),
            ...filteredExtraHeaders
        }

        if (config.appSsrDebug) {
            console.log('Заголовки:', headers)
            console.log('Тело запроса:', body)
        }

        const response = await $fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        })
        if (config.appSsrDebug) {
            console.log('Ответ от API:', response)
        }
        return response
    } catch (error) {
        return handle(error)
    }
}