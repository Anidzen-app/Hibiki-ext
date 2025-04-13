export const handle = (error: any) => {
    console.error('Обработка ошибки:', error)

    if (error.response) {
        const status = error.response.status
        const message = error.response._data || 'Unknown API error'

        console.error('Ошибка API. Статус:', status)
        console.error('Сообщение ошибки:', message)

        return {
            error: message,
            status: status
        }
    }

    if (error instanceof Error) {
        console.error('Ошибка типа Error:', error.message)
        return { error: error.message }
    }

    console.error('Неизвестная ошибка')
    return { error: 'An unexpected error occurred', status: 500 }
}