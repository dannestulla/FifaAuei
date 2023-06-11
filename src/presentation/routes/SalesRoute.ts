import { Router } from "express";
const router: Router = Router();
import * as SalesController from "../controllers/SalesController";

router.post("/getSales", SalesController.getSalesInADay);

router.post("/getSalesInAMonth", SalesController.getSalesInAMonth);

router.get("/getMethodInAMonth", SalesController.getMethodInAMonth);

router.get("/getSchoolInAMonth", SalesController.getSchoolInAMonth);

export default router;