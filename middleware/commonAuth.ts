import { Request, Response, NextFunction } from 'express';
import { authPayload } from '../dto/Auth.dto';
import { validateSignature } from '../utils';

declare global {
  namespace Express {
    interface Request {
      user?: authPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateSignature(req);
  if (validate) {
    next();
  } else {
    return res.json({ message: 'User not authorized' });
  }
};
