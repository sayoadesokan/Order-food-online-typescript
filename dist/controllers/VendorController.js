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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFood = exports.addFood = exports.updateVendorService = exports.updateVendorCoverProfile = exports.updateVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
const AdminController_1 = require("./AdminController");
const utils_1 = require("../utils");
const Food_1 = require("../models/Food");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingVendor = yield (0, AdminController_1.findVendor)('', email);
        if (existingVendor) {
            const validation = yield (0, utils_1.validatePassword)(password, existingVendor.password, existingVendor.salt);
            if (validation) {
                const signature = yield (0, utils_1.generateSignature)({
                    _id: existingVendor.id,
                    email: existingVendor.email,
                    foodType: existingVendor.foodType,
                    name: existingVendor.name,
                });
                return res.json(signature);
            }
            else {
                res.json({ message: 'password is not correct' });
            }
        }
        return res.json({
            message: 'Login with a different username and password',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.vendorLogin = vendorLogin;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log('here');
        if (user) {
            const existingVendor = yield (0, AdminController_1.findVendor)(user._id);
            console.log(existingVendor);
            return res.json(existingVendor);
        }
        return res.json({ message: 'vendor Information Not Found' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVendorProfile = getVendorProfile;
const updateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone, foodTypes } = req.body;
        const user = req.body;
        if (user) {
            const existingVendor = yield (0, AdminController_1.findVendor)(user._id);
            if (existingVendor !== null) {
                existingVendor.name = name;
                existingVendor.address = address;
                existingVendor.phone = phone;
                existingVendor.foodType = foodTypes;
                const savedResult = yield existingVendor.save();
                return res.json(savedResult);
            }
            return res.json(existingVendor);
        }
        return res.json({ message: 'Vendor information not found' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateVendorProfile = updateVendorProfile;
const updateVendorCoverProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const vendor = yield (0, AdminController_1.findVendor)(user._id);
            if (vendor !== null) {
                const files = req.files;
                const images = files.map((file) => file.filename);
                vendor.coverImage.push(...images);
                const result = yield vendor.save();
                return res.json(result);
            }
        }
        return res.json('Something went wrong when adding food');
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateVendorCoverProfile = updateVendorCoverProfile;
const updateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = yield (0, AdminController_1.findVendor)(user._id);
            if (existingVendor !== null) {
                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                const savedResult = yield existingVendor.save();
                return res.json(savedResult);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateVendorService = updateVendorService;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const { name, description, category, foodType, readyTime, price } = req.body;
            const vendor = yield (0, AdminController_1.findVendor)(user._id);
            if (vendor !== null) {
                const files = req.files;
                // const images = files.map((file: Express.Multer.File) => file.filename);
                const createdFood = yield Food_1.Food.create({
                    vendorId: vendor._id,
                    name: name,
                    description: description,
                    category: category,
                    foodType: foodType,
                    // images: images,
                    readyTime: readyTime,
                    price: price,
                    rating: 0,
                });
                vendor.foods.push(createdFood); // push the _id property instead
                const result = yield vendor.save();
                return res.json(result);
            }
        }
        return res.json('Something went wrong when adding food');
    }
    catch (error) {
        console.log(error);
    }
});
exports.addFood = addFood;
const getFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const foods = yield Food_1.Food.find({ vendorId: user._id });
            if (foods !== null) {
                return res.json(foods);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFood = getFood;
//# sourceMappingURL=VendorController.js.map