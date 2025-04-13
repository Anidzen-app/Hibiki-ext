import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
    {
        ignores: ['node_modules/', '.nuxt/', '.output/', 'dist/', 'ui-pro-plugin/']
    }
])