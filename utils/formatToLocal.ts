export const formatToLocal = (isoDate: string | null, userTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone, locale: string = 'ru-RU') => {
    if (!isoDate) return '—'
    const date = new Date(isoDate)

    return date.toLocaleString(locale, {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: userTimeZone,
    })
}
