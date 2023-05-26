import {Router } from "express";
import * as HotmartController from "../Controllers/HotmartController";
const router: Router = Router();

router.get("/getSales", (req, res) => {
    res.send(HotmartController.getSales)
})

export default Router;