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
exports.getVendorById = exports.getVendor = exports.createVendor = exports.findVendor = void 0;
const Vendor_1 = require("../models/Vendor");
const utils_1 = require("../utils");
const findVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield Vendor_1.vendor.findOne({ email: email });
    }
    else {
        return yield Vendor_1.vendor.findById(id);
    }
});
exports.findVendor = findVendor;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, phone, pinCode, foodType, email, password, ownerName, } = req.body;
    const existingVendor = yield Vendor_1.vendor.findOne({ email: email });
    if (existingVendor) {
        return res.json({ message: 'User already exist' });
    }
    //install bcrypt (npm i bcrypt, @types/bcrypt, npm i --save-dev @types/bcrypt)
    //generate a salt
    const salt = yield (0, utils_1.generateSalt)();
    //encrypt the password using the salt
    const userPassword = yield (0, utils_1.generatePassword)(password, salt);
    const createVendor = yield Vendor_1.vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImage: [],
        foods: [],
    });
    return res.status(200).json(createVendor);
});
exports.createVendor = createVendor;
const getVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield Vendor_1.vendor.find();
        if (!vendors) {
            res.json({ message: 'no vendor available' });
        }
        res.json(vendors);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVendor = getVendor;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendorId = req.params.id;
        const Vendor = yield (0, exports.findVendor)(vendorId);
        if (!Vendor) {
            res.json({ message: 'Vendor does not exist' });
        }
        res.status(200).json(Vendor);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVendorById = getVendorById;
//# sourceMappingURL=AdminController.js.map