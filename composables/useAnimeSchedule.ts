export async function useAnimeSchedule() {
    const { data } = useFetch('/api/shikimori/calendar')
    const today = new Date().getDay();

    return data.value?.filter(item => {
        const airingDay = new Date(item.next_episode_at).getDay();
        return airingDay === today;
    });
}
