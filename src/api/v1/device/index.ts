/** 
 * load all gateway routes. Routes name  prefix corresponds to the appropriate 
 * `REST` API verb.
 * @Note we can add more verbs to the  one defined at any time
  */
import deviceRouter from "./router/all.router";
/** 
 * Define router for all the `device` endpoint. This will map `http methods`
 * to their corresponding route handlers.
 * 
 * This is same approach used within the gateway route endpoint.
 * 
 * @see {@link  gateway  check out this link for similar implementation}
 */
export default deviceRouter;