import express, { Request, Response, NextFunction } from 'express';
import { createVendor } from '../controllers';
import { getVendor } from '../controllers';
import { getVendorById } from '../controllers';

const router = express.Router();

router
  .post('/vendor', createVendor)
  .get('/vendor', getVendor)
  .get('/vendor/:id', getVendorById);

export { router as AdminRoutes };
