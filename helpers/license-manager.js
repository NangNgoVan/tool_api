const mongoose = require('mongoose');
const licenseSchema = require('../schemas/license');
const licenseConverter = require('./license-converter');
var CryptoJs = require('crypto-js');

module.exports.createLicense = function(productId, datetime, licenseType) {
    var licenseModel = mongoose.model("License", licenseSchema);
    var license = new licenseModel();

    license.productId = productId;
    license.date = datetime;
    license.licenseType = licenseType;

    var licenseBody = CryptoJs.MD5(license.toFormatString());

    var licenseFormated = license.getFormatedDate()+"-"+licenseConverter.reverseFrom(licenseBody)+"-"+licenseType;

    return licenseFormated;
};