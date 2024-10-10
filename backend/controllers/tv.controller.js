import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1");

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({ succes: true, content: randomMovie })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);


        res.json({ succes: true, trailers: data.results })
    } catch (error) {
        if (error.message.includes("404")) {

            res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);


        res.json({ succes: true, details: data })
    } catch (error) {
        if (error.message.includes("404")) {

            res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getSimilarTv = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);


        res.json({ succes: true, similar: data.results })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
export const getTvByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);


        res.json({ succes: true, content: data.results })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}
