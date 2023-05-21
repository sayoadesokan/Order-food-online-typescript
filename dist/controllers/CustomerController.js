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
exports.editCustomerProfile = exports.getCustomerProfile = exports.requestOTP = exports.customerVerify = exports.customerLogin = exports.customerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const Customer_dto_1 = require("../dto/Customer.dto");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const Customer_1 = require("../models/Customer");
const customerSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.CreateCustomerInput, req.body);
        const inputErrors = yield (0, class_validator_1.validate)(customerInput, {
            validationError: { target: true },
        });
        if (inputErrors.length > 0) {
            return res.status(200).json(inputErrors);
        }
        const { email, phone, password } = customerInput;
        const salt = yield (0, utils_1.generateSalt)();
        const userPassword = yield (0, utils_1.generatePassword)(password, salt);
        const { otp, expiry } = (0, utils_1.generateOtp)();
        const existingCustomer = yield Customer_1.Customer.findOne({ email: email });
        if (existingCustomer !== null) {
            return res
                .status(409)
                .json({ message: 'A user already exist with this email' });
        }
        const result = yield Customer_1.Customer.create({
            email: email,
            password: userPassword,
            salt: salt,
            otp: otp,
            phone: phone,
            otp_expiry: expiry,
            firstName: '',
            lastName: '',
            address: '',
            verified: false,
            lat: 0,
            lng: 0,
        });
        if (result) {
            //send the OTP to customer
            yield (0, utils_1.onRequestOTP)(otp, phone);
            //generate the signature
            const signature = (0, utils_1.generateSignature)({
                _id: result.id,
                email: result.email,
                verified: result.verified,
            });
            //send the result to client
            return res.status(201).json({
                signature: signature,
                verified: result.verified,
                email: result.email,
            });
        }
        return res.status(400).json({ message: 'Error with signature' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.customerSignUp = customerSignUp;
const customerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.userLoginInputs, req.body);
        const loginErrors = yield (0, class_validator_1.validate)(loginInputs, {
            validationError: { target: false },
        });
        if (loginErrors.length > 0) {
            return res.status(200).json(loginErrors);
        }
        const { email, password } = loginInputs;
        const customer = yield Customer_1.Customer.findOne({ email: email });
        if (customer) {
            const validate = yield (0, utils_1.validatePassword)(password, customer.password, customer.salt);
            if (validate) {
                //generate signature
                const signature = (0, utils_1.generateSignature)({
                    _id: customer.id,
                    email: customer.email,
                    verified: customer.verified,
                });
                //send the result to the client
                return res.status(201).json({
                    signature: signature,
                    verified: customer.verified,
                    email: customer.email,
                });
            }
        }
        return res.status(404).json({ message: 'Login Error' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.customerLogin = customerLogin;
const customerVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                if (profile.otp === parseInt(otp) && profile.otp_expiry >= Date.now()) {
                    profile.verified = true;
                    // Rest of your code...
                    const updateCustomerResponse = yield profile.save();
                    //generate signature
                    const signature = (0, utils_1.generateSignature)({
                        _id: updateCustomerResponse.id,
                        email: updateCustomerResponse.email,
                        verified: updateCustomerResponse.verified,
                    });
                    return res.status(201).json({
                        signature: signature,
                        verified: updateCustomerResponse.verified,
                        email: updateCustomerResponse.email,
                    });
                }
            }
        }
        return res.status(400).json({ message: 'Error with OTP validation' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.customerVerify = customerVerify;
const requestOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                const { otp, expiry } = (0, utils_1.generateOtp)();
                profile.otp = otp;
                profile.otp_expiry = expiry.getTime(); // Convert expiry to Unix timestamp
                yield profile.save();
                yield (0, utils_1.onRequestOTP)(otp, profile.phone);
                res.status(200).json({ message: 'OTP sent to your phone number' });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.requestOTP = requestOTP;
const getCustomerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                return res.status(200).json(profile);
            }
        }
        return res
            .status(404)
            .json({ message: 'Error while getting your profile' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCustomerProfile = getCustomerProfile;
const editCustomerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.user;
        const profileInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.editCustomerProfileInput, req.body);
        const profileErrors = yield (0, class_validator_1.validate)(profileInputs, {
            validationError: { target: false },
        });
        if (profileErrors.length > 0) {
            return res.status(200).json(profileErrors);
        }
        const { firstName, lastName, address } = profileInputs;
        if (customer) {
            const profile = yield Customer_1.Customer.findById(customer._id);
            if (profile) {
                (profile.firstName = firstName),
                    (profile.lastName = lastName),
                    (profile.address = address);
                const result = yield profile.save();
                res.status(200).json(result);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.editCustomerProfile = editCustomerProfile;
//# sourceMappingURL=CustomerController.js.map