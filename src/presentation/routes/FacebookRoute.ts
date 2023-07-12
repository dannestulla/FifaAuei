import { Router } from "express";
const router: Router = Router();
import * as AdsController from "../controllers/AdsController";

router.get("/getAdsInAMonth", AdsController.getAdsInAMonth);

export default router;