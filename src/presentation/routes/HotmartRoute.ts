import { Router } from "express";
const router: Router = Router();
import * as HotmartController from "../controllers/HotmartController";

router.post("/getSales", HotmartController.getSales);

router.get("/getMethod", HotmartController.getMethod);

router.get("/getSchool", HotmartController.getSchool);

export default router;