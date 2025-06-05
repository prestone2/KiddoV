import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(
    import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['*', 'http://localhost:4000']
}))

// Serve static files from the 'Public' folder within the server directory
app.use(express.static(path.join(__dirname, 'Public')))

// Use process.env.PORT with a fallback to 4000 for local development
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))