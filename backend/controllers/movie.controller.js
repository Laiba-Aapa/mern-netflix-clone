import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1");

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({ succes: true, content: randomMovie })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);


        res.json({ succes: true, trailers: data.results })
    } catch (error) {
        if (error.message.includes("404")) {

            res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);


        res.json({ succes: true, details: data })
    } catch (error) {
        if (error.message.includes("404")) {

            res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);


        res.json({ succes: true, similar: data.results })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getMoviesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);


        res.json({ succes: true, content: data.results })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
