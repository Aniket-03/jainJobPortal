import express from "express";
import { dummyService } from "../controllers/dummy.controller.js";

 
const router = express.Router();

router.route("/getDummy").get(dummyService);

export default router;

