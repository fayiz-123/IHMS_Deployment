const otp = require('otp-generator')

function generateOtp(){
    return otp.generate(6, { upperCaseAlphabets: false, specialChars: false });
}

module.exports=generateOtp;
