import { Router } from "express";
const router: Router = Router();
import * as SalesController from "../controllers/SalesController";

router.post("/getSales", SalesController.getSalesInADay);

router.post("/getSalesInAMonth", SalesController.getSalesInAMonth);

router.get("/getMethod", SalesController.getMethod);

router.get("/getSchool", SalesController.getSchool);

export default router;