import {useHandle} from "~/composables/useHandle";

type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'

export const useApiClient = async <T>(
    url: string,
    method?: HttpMethod,
    body: unknown = null,
    extraHeaders?: HeadersInit
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
            ...useGetBaseHeaders(),
            ...filteredExtraHeaders
        }

        return await $fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        }) as T;
    } catch (error) {
        return useHandle(error) as T
    }
}