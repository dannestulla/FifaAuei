import { Router } from "express";
const router: Router = Router();
import * as HotmartController from "../Controllers/HotmartController";


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  });

router.post("/getSales", HotmartController.getSales);

export default router;