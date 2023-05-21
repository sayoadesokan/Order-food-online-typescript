"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const ShoppingController_1 = require("../controllers/ShoppingController");
const router = express_1.default.Router();
exports.shoppingRoute = router;
/**-----------Food Availability--------------- **/
router.get('/:pincode', ShoppingController_1.getFoodAvailability);
/**-----------Top Restaurants--------------- **/
router.get('/top-restaurants/:pincode', ShoppingController_1.getTopRestaurants);
/**-----------FOod Available in 30mins--------------- **/
router.get('/food-in-30-mins/:pincode', ShoppingController_1.getFoodIn30mins);
/**-----------Search Food--------------- **/
router.get('/search/:pincode', ShoppingController_1.searchFoods);
/**-----------Find Restaurants by ID--------------- **/
router.get('/restaurants/:id', ShoppingController_1.restaurantsById);
//# sourceMappingURL=ShoppingRoutes.js.map