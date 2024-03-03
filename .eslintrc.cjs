module.exports = {
    root: true,
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
    env: {
        "vue/setup-compiler-macros": true,
    },
    rules: {
        'import/first': 'off',
        'import/no-named-as-default': 0,
        camelcase: 'off',
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 0,
        'no-control-regex': 0,
        'unicorn/escape-case': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-var': 'error',
        'vue/no-v-html': 'off',
        'vue/no-lone-template': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/order-in-components': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};