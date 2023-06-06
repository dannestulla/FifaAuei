import { Router } from "express";
const router: Router = Router();
import * as FacebookController from "../controllers/FacebookController";


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  });

router.get("/getAds", FacebookController.getAds);

export default router;