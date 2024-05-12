import crypto from "crypto";
import moment from "moment";

const OTP_LENGTH = 8;
const OTP_EXPIRATION_MINUTES = 15;

export const generateOTP = () => {
  const buffer = crypto.randomBytes(OTP_LENGTH);
  let otp = "";
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += buffer[i] % 10;
  }
  const expirationTime = moment().add(OTP_EXPIRATION_MINUTES, "minutes");

  return { otp, expirationTime };
};

export const isOTPExpired = (expirationTime: moment.Moment) => {
  return moment().isAfter(expirationTime);
};
