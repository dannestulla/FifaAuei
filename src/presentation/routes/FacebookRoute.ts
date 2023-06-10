import { Router } from "express";
const router: Router = Router();
import * as FacebookController from "../controllers/FacebookController";

router.get("/getAdsInAMonth", FacebookController.getAdsInAMonth);

router.get("/getAds", FacebookController.getAdsInADay);

export default router;