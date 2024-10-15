import express from 'express'
const app = express()
import cookieParser from 'cookie-parser';
import { ENV_VARS } from './config/envVars.js';
import { connectDb } from './config/db.js';
import { protectedRoute } from './middleware/protectedRoute.js';
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoute from './routes/search.route.js';
import cors from 'cors';
import path from 'path'
// const client = ENV_VARS.CLIENT_URL || 'http://localhost:5173'
// const client = 'http://localhost:5173'

// app.use(cors({
//     // origin: 'https://laiba-netflix-clone.vercel.app',
//     methods: ['GET', 'POST', 'OPTIONS'],
//     credentials: true, // allow credentials if you're sending cookies
// }));

app.use(cors({
    origin: "*",  // For testing, but will need to specify later
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: false,  // Temporarily disable credentials
}));

// Handle preflight requests
app.options('*', cors());

const PORT = ENV_VARS.PORT || 5000;

const __dirname = path.resolve()
app.use(express.json()) // will allow us to parse req.body
app.use(cookieParser())// will allow us to parse cookie token in middleware in requests.
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', protectedRoute, movieRoutes)
app.use('/api/v1/tv', protectedRoute, tvRoutes)
app.use('/api/v1/search', protectedRoute, searchRoute)


if (ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT)
    connectDb();
})

