import dotenv from 'dotenv'
dotenv.config()

export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/2020-reimagined-db'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'hello penny, hugo and aislin'