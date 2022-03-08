import express from "express";
/** 
 * Import all application controllers
 */
import  {getAllGateways, getGatewayById} from "../controllers/get.controller";
import  {deleteGateway} from "../controllers/delete.controller";
import  {updateGateway} from "../controllers/patch.controller";
import  {addGateway} from "../controllers/post.controller";
/**
 * This is the `lowest level` route manager. It manages individual `gateway` API `endpoint`
 * and call the appropriate `controller` for route `actions
 */
const router = express.Router();
/**
 *  Get method mapping
 * */
router.get("", getAllGateways);
router.get("/:gatewayId", getGatewayById);
/**
 * All post request defined here
 */
router.post("", addGateway);
/** 
 * Define all patch request. These are request that involves update
 */
router.patch("/update/:gatewayId", updateGateway);
/**
 * Delete operations added here
 */
router.delete("/delete/:gatewayId", deleteGateway);

export default router;