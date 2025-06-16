export const PORT = process.env.PORT || 3000
export const ACCESS_TOKEN_MINUTE_SIGN_RELATIVE = '10m'
export const ACCESS_TOKEN_MINUTE_SIGN_NOMINAL = 1000 * 60 * 10
export const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'some_secret_key'
export const APP_FRONTEND_URL = process.env.APP_FRONTEND_URL || 'http://localhost:5173'
