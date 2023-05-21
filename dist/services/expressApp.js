"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const VendorRoutes_1 = require("../routes/VendorRoutes");
const AdminRoutes_1 = require("../routes/AdminRoutes");
const path_1 = __importDefault(require("path"));
const ShoppingRoutes_1 = require("../routes/ShoppingRoutes");
const CustomerRoutes_1 = require("../routes/CustomerRoutes");
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.use('/admin', AdminRoutes_1.AdminRoutes);
    app.use('/vendor', VendorRoutes_1.vendorRoutes);
    app.use('/customer', CustomerRoutes_1.CustomerRoutes);
    app.use(ShoppingRoutes_1.shoppingRoute);
    return app;
});
//# sourceMappingURL=expressApp.js.map