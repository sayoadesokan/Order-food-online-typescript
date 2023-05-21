"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const commonAuth_1 = require("../middleware/commonAuth");
const router = express_1.default.Router();
exports.vendorRoutes = router;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    },
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
router
    .post('/login', controllers_1.vendorLogin)
    .use(commonAuth_1.Authenticate)
    .get('/profile', controllers_1.getVendorProfile)
    .patch('/profile', controllers_1.updateVendorProfile)
    .patch('/coverimage', images, controllers_1.updateVendorCoverProfile)
    .patch('/service', controllers_1.updateVendorService)
    .post('/food', images, controllers_1.addFood)
    .get('/foods', controllers_1.getFood);
//# sourceMappingURL=VendorRoutes.js.map