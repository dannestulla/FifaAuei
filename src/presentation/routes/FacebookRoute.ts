import { Router } from "express";
const router: Router = Router();
import * as FacebookController from "../controllers/FacebookController";

router.get("/getAds", FacebookController.getAds);

export default router;