import { useRuntimeConfig } from '#imports'

export const getConfig = () => {
    const config = useRuntimeConfig()

    return {
        ...config,
        appSsrDebug: config.appSsrDebug === 'true'
    }
}