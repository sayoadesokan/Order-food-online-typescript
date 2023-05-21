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
exports.onRequestOTP = exports.generateOtp = void 0;
const Index_1 = require("../config/Index");
//Email
//Notification
//OTP
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 908000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.generateOtp = generateOtp;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = Index_1.TWILLO_ACCOUNT_ID;
    const authToken = Index_1.TWILLO_AUTHTOKEN;
    const client = require('twilio')(accountId, authToken);
    const response = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '',
        to: toPhoneNumber,
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
//payment notification or emails
//# sourceMappingURL=notificationUtility.js.map