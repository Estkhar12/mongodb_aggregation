import express from "express";
import propertyTypes from "../controllers/propertyListController.js";


const router = express.Router();


router.get("/property-types", propertyTypes);

export default router;
