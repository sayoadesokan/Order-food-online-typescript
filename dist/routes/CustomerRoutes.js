"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const commonAuth_1 = require("../middleware/commonAuth");
const router = express_1.default.Router();
exports.CustomerRoutes = router;
/**----------------Signup/Create Customer -------------**/
router.post('/signup', controllers_1.customerSignUp);
/**----------------Login-------------**/
router.post('/login', controllers_1.customerLogin);
//Authentication
router.use(commonAuth_1.Authenticate);
/**----------------Verify Customer Account -------------**/
router.patch('/verify', controllers_1.customerVerify);
/**----------------OTP/ Requesting OTP -------------**/
router.get('/otp', controllers_1.requestOTP);
/**----------------Profile -------------**/
router.get('/profile', controllers_1.getCustomerProfile);
router.patch('/profile', controllers_1.editCustomerProfile);
//# sourceMappingURL=CustomerRoutes.js.map