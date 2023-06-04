import express from 'express';
import {getUser,gethi} from '../controllers/general.js';
const router=express.Router();


router.get('/hi',gethi)
router.get("/user/:id",getUser)


export default router;
