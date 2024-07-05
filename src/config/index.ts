/// <reference types="vite/client" />

export interface BackendConfig {
  baseUrl: string
}

export interface DynamicLocalizationConfig {
  baseUrl: string
}

export interface ObservabilityConfig {
  connectionString: string
}

export interface AppConfig {
  backend: BackendConfig
  dynamicLocalization: DynamicLocalizationConfig
  observability: ObservabilityConfig
}

const config: AppConfig = {
  backend: {
    baseUrl: import.meta.env.BACKEND_BASE_URL || 'http://localhost:8080/api/v1/'
  },
  dynamicLocalization: {
    baseUrl: import.meta.env.DYNAMIC_LOCALIZATION_BASE_URL || ''
  },
  observability: {
    connectionString: import.meta.env.APPLICATIONINSIGHTS_CONNECTION_STRING || ''
  }
}

export default config;