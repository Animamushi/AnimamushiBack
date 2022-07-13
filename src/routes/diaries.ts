import express from "express";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Ferching diaries');
})

router.post('/', (_req, res) => {
    res.send('saving')
})

export default router;