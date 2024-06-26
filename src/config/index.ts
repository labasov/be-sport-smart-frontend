/// <reference types="vite/client" />

export interface ApiConfig {
    baseUrl: string
}

export interface TranslationApiConfig {
    baseUrl: string
}

export interface ObservabilityConfig {
    connectionString: string
}

export interface AppConfig {
    api: ApiConfig
    translationApi: TranslationApiConfig
    observability: ObservabilityConfig
}

const config: AppConfig = {
    api: {
        baseUrl: import.meta.env.API_BASE_URL || 'http://localhost:8080/api/v1/'
    },
    translationApi:{
        baseUrl: import.meta.env.TRANSLATION_API_BASE_URL || 'http://localhost:8080/api/v1/'
    },
    observability: {
        connectionString: import.meta.env.APPLICATIONINSIGHTS_CONNECTION_STRING || ''
    }
}

export default config;