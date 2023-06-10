import { Router } from "express";
const router: Router = Router();
import * as HotmartController from "../controllers/HotmartController";

router.post("/getSales", HotmartController.getSalesInADay);

router.post("/getSalesInAMonth", HotmartController.getSalesInAMonth);

router.get("/getMethod", HotmartController.getMethod);

router.get("/getSchool", HotmartController.getSchool);

export default router;