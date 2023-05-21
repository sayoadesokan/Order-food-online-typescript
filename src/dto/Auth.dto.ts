import { vendorPayload } from './Vendor.dto';
import { customerPayload } from './Customer.dto';

export type Authpayload = vendorPayload | customerPayload;
