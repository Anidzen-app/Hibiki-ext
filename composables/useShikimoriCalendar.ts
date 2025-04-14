import {useApiClient} from "~/composables/useApiClient";
import {getHeaders} from "h3";

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

export async function fetchShikimoriCalendar(apiUrl: string, headers: HeadersInit = {}): Promise<Anime[]> {
    const currentYear = new Date().getFullYear()

    const allOngoings: Anime[] = []
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

        const response = await useApiClient<AnimeApiResponse>(apiUrl, 'POST', { query }, headers)
        const currentPageData = response.data.animes || []
        const filteredData = currentPageData.filter(anime => anime.nextEpisodeAt)
        allOngoings.push(...filteredData)

        if (currentPageData.length < limit) {
            hasMore = false
        } else {
            page++
        }
    }

    allOngoings.sort((a, b) => {
        const dateA = new Date(a.nextEpisodeAt!).getTime()
        const dateB = new Date(b.nextEpisodeAt!).getTime()
        return dateA - dateB
    })

    return allOngoings
}
