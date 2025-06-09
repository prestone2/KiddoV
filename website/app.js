import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import authRoutes from './backend/routes/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: ['*', 'http://localhost:4000']
}))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)

// Serve static files from the 'Public' folder
app.use(express.static(path.join(__dirname, 'Public')))

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))