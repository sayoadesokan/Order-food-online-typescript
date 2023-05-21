"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const controllers_2 = require("../controllers");
const controllers_3 = require("../controllers");
const router = express_1.default.Router();
exports.AdminRoutes = router;
router
    .post('/vendor', controllers_1.createVendor)
    .get('/vendor', controllers_2.getVendor)
    .get('/vendor/:id', controllers_3.getVendorById);
//# sourceMappingURL=AdminRoutes.js.map