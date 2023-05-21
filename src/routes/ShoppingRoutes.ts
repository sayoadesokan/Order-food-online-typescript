import express, { Request, Response, NextFunction } from 'express';
import {
  getFoodAvailability,
  getFoodIn30mins,
  getTopRestaurants,
  restaurantsById,
  searchFoods,
} from '../controllers/ShoppingController';

const router = express.Router();

/**-----------Food Availability--------------- **/
router.get('/:pincode', getFoodAvailability);
/**-----------Top Restaurants--------------- **/
router.get('/top-restaurants/:pincode', getTopRestaurants);
/**-----------FOod Available in 30mins--------------- **/
router.get('/food-in-30-mins/:pincode', getFoodIn30mins);
/**-----------Search Food--------------- **/
router.get('/search/:pincode', searchFoods);
/**-----------Find Restaurants by ID--------------- **/
router.get('/restaurants/:id', restaurantsById);

export { router as shoppingRoute };
