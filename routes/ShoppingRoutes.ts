import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/**--------------------Food Availability ----------------**/
router.get('/:pincode');

/**--------------------Top Restaurants ----------------**/
router.get('/top-restaurant/:pincode');

/**--------------------Food Available in 30mins ----------------**/
router.get('/top-restaurant-in-30mins/:pincode');

/**--------------------Search Food ----------------**/
router.get('/search/:pincode');

/**--------------------Find Restaurant by id ----------------**/
router.get('/restaurant/:id');

export { router as shoppingRoutes };
