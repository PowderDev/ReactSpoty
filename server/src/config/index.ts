const developmentConfig = {
    port: process.env.PORT || 4000,
    JWT_ACCESS_SECRET: "secret",
    JWT_REFRESH_SECRET: "refresh-secret",
}

const productionConfig = {
    port: process.env.PORT || 4000,
    JWT_ACCESS_SECRET: "secret",
    JWT_REFRESH_SECRET: "refresh-secret",
}

const curr = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default curr