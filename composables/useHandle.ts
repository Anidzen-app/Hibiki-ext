interface APIErrorResponse {
    response: {
        status: number
        _data?: string
    }
}

function useIsAPIError(error: unknown): error is APIErrorResponse {
    if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
    ) {
        const err = error as { response?: unknown }

        if (
            typeof err.response === 'object' &&
            err.response !== null &&
            'status' in err.response
        ) {
            const res = err.response as { status?: unknown }
            return typeof res.status === 'number'
        }
    }
    return false
}

export const useHandle = (error: unknown) => {
    console.error('Обработка ошибки:', error)

    if (useIsAPIError(error)) {
        const status = error.response.status
        const message = error.response._data || 'Unknown API error'

        console.error('Ошибка API. Статус:', status)
        console.error('Сообщение ошибки:', message)

        return {
            error: message,
            status
        }
    }

    if (error instanceof Error) {
        console.error('Ошибка типа Error:', error.message)
        return { error: error.message }
    }

    console.error('Неизвестная ошибка')
    return { error: 'An unexpected error occurred', status: 500 }
}
