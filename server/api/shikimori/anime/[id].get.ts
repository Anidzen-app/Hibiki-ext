import { defineEventHandler, getHeaders } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        interface Anime {
            id: number
            russian: string
            nextEpisodeAt: string | null
            poster: {
                mainUrl: string
            }
            genres: {
                russian: string
            }[]
        }

        interface AnimeApiResponse {
            data: {
                animes: Anime[]
            }
        }

        const config = useRuntimeConfig(event)
        const headers = getHeaders(event)
        const apiUrl = config.shikimoriApiBaseUrl

        const idParam = event.context.params?.id

        if (!idParam) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID is required',
            })
        }

        const id = parseInt(idParam as string)

        if (!Number.isInteger(id)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID should be an integer',
            })
        }

        const query = `
            query {
              animes(ids: "${id}") {
                id
                russian
                nextEpisodeAt
                poster {
                  mainUrl
                }
                genres {
                  russian
                }
              }
            }
        `

        return await apiClient<AnimeApiResponse>(apiUrl, 'POST', { query }, headers)
    } catch (error) {
        return handle(error)
    }
})
