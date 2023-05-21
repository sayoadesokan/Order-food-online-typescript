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
exports.restaurantsById = exports.searchFoods = exports.getFoodIn30mins = exports.getTopRestaurants = exports.getFoodAvailability = void 0;
const Vendor_1 = require("../models/Vendor");
const getFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield Vendor_1.vendor
            .find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .sort([['rating', 'descending']])
            .populate('foods');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(400).json('Data not found');
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFoodAvailability = getFoodAvailability;
const getTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield Vendor_1.vendor
            .find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .sort([['rating', 'descending']])
            .limit(1);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(400).json('Data not found');
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTopRestaurants = getTopRestaurants;
const getFoodIn30mins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield Vendor_1.vendor
            .find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .sort([['rating', 'descending']])
            .populate({
            path: 'foods',
            match: { readyTime: { $lte: 30 } },
        })
            .lean(); // Add .lean() to retrieve plain JavaScript objects
        if (result.length > 0) {
            const foodResult = [];
            result.forEach((vendor) => {
                // Use 'any' type for vendor
                const foods = vendor.foods; // Cast to FoodDoc[]
                foodResult.push(...foods);
            });
            return res.status(200).json(foodResult);
        }
        return res.status(400).json('Data not found');
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFoodIn30mins = getFoodIn30mins;
const searchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const result = yield Vendor_1.vendor
            .find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map((item) => foodResult.push(...item.foods));
            return res.status(200).json(foodResult);
        }
        return res.status(400).json('Data not found');
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchFoods = searchFoods;
const restaurantsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield Vendor_1.vendor.findById(id).populate('foods');
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(400).json('Data not found');
    }
    catch (error) {
        console.log(error);
    }
});
exports.restaurantsById = restaurantsById;
//# sourceMappingURL=ShoppingController.js.map