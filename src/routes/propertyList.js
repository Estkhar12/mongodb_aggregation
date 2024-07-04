import express from "express";

import propertyTypes from "../controllers/propertyType.js";
import searchPropertyList from "../controllers/propertyTypeList.js";


const router = express.Router();


router.get("/property-types", propertyTypes);
router.get("/search-property", searchPropertyList);

export default router;
