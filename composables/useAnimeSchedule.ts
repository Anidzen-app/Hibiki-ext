export async function useAnimeSchedule() {
    const { data } = useFetch('/api/shikimori/calendar')
    return data;
}
