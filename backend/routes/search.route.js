import express from "express"
import { getSearchHistory, removeItemFromSearchHistory, saveHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.contoller.js";


const router = express.Router();

router.get('/person/:query', searchPerson)
router.get('/movie/:query', searchMovie)
router.get('/tv/:query', searchTv)
router.get('/history', getSearchHistory)
router.post('/save', saveHistory)
router.get('/history/:id', removeItemFromSearchHistory)


export default router;