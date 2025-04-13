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

        const config = useRuntimeConfig(event)
        const headers = getHeaders(event)
        const apiUrl = config.shikimoriApiBaseUrl
        const currentYear = new Date().getFullYear()

        const allOngoings = []
        let page = 1
        const limit = 50
        let hasMore = true

        while (hasMore) {
            const query = `
        query {
          animes(season: "${currentYear}", limit: ${limit}, page: ${page}, status: "ongoing", kind: "!special") {
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

            const response = await apiClient(apiUrl, 'POST', { query }, headers)

            const currentPageData: Anime[] = response?.data?.animes || []

            const filteredData = currentPageData.filter(anime => anime.nextEpisodeAt)

            allOngoings.push(...filteredData)

            if (currentPageData.length < limit) {
                hasMore = false
            } else {
                page++
            }
        }

        return allOngoings
    } catch (error) {
        return handle(error)
    }
})
