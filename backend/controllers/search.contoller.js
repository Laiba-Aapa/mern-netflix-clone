import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        // Fetch data from the TMDB API
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        // Check if results array is empty
        if (response.results && response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Update search history in the User model
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        });

        // Send a successful response
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const searchMovie = async (req, res) => {

    const { query } = req.params;
    try {
        // Fetch data from the external API
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        // Return all results to the frontend
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
}
export const searchTv = async (req, res) => {
    const { query } = req.params
    try {
        // Fetch data from the external API
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        // Return all results to the frontend
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

export const saveHistory = async (req, res) => {
    const { content, searchType } = req.body;

    try {
        // Check if the item already exists in the search history
        const user = await User.findById(req.user._id);

        const isAlreadyInHistory = user.searchHistory.some(
            (item) => item.id === content.id
        );

        if (isAlreadyInHistory) {
            return res.status(200).json({ success: false, message: "Item already exists in search history" });
        }

        // If it doesn't exist, add the selected movie or TV show to the search history
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: content.id,
                    image: content.poster_path,
                    title: content.title || content.name, // handle movie or show
                    searchType: searchType,
                    createdAt: new Date(),
                }
            }
        });

        res.status(201).json({ success: true, message: "Item added to search history" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};


export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error " })
    }
}
export const removeItemFromSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {// delete from database
                searchHistory: {
                    id: id
                }
            }
        })
        res.status(200).json({ success: true, message: "Item removed from the history" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error " })
    }
}