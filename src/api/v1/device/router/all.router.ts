import express from "express";
/** 
 * Import all application controllers
 */
import { getAllDevicesByGateway, getDeviceById } from "../controllers/get.controller";
import { addDevice } from "../controllers/post.controller";
import { updateDevice } from "../controllers/patch.controller";
import { deleteDevice } from "../controllers/delete.controller";
/**
 * This is the `lowest level` route manager. It manages individual `device` API `endpoint`
 * and call the appropriate `controller` for route `actions
 */
const router = express.Router();
/**
 *  Get method mapping
 * */
router.get("/:gatewayId", getAllDevicesByGateway);
router.get("/find/:gatewayId/device/:deviceId", getDeviceById);
/**
 * All post request defined here
 */
router.post("/:gatewayId", addDevice);
/** 
 * Define all patch request. These are request that involves update
 */
router.patch("/update/:gatewayId/device/:deviceId", updateDevice);
/**
 * Delete operations added here
 */
router.delete("/delete/:gatewayId/device/:deviceId", deleteDevice);

export default router;