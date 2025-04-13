import type {RequestHeaders} from 'h3'

type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'

export const apiClient = async <T>(
    url: string,
    method?: HttpMethod,
    body: unknown = null,
    extraHeaders?: RequestHeaders
): Promise<T> => {
    try {
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

        const headers = {
            ...getBaseHeaders(),
            ...filteredExtraHeaders
        }

        return await $fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        }) as T;
    } catch (error) {
        return handle(error) as T
    }
}