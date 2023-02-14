import express from 'express'
import { getAllCategories, getAllNotes, getNoteById } from '../controllers/noteController.js';

const router = express.Router()

// get all the notes
router.route('/getAllNotes')
.get(getAllNotes)


router.route('/getNote/:noteid')
.get(getNoteById);


router.route('/getCategories')
.get(getAllCategories);


export default router;