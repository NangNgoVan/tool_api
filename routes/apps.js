var express = require('express');
var router = express.Router();

var licenseManager = require('../helpers/license-manager');

/* GET admin home page. */
router.get('/fb-tool', function(req, res, next) {
  res.render('apps/fb-tool/index');
});

router
    .get('/fb-tool/license', function(req,res,next) {
    res.render('apps/fb-tool/license');
    })
    .post('/fb-tool/license', function(req, res) {
      var email = req.body.email;
      var licenseType = req.body.licenseType;
      var productId = "this-isxx-uniq-uepr-oduc-tidx";
      var date = new Date;

      var license = licenseManager.createLicense(productId,date,licenseType);
      res.json({success: true, msg: "", license: license});
    });

module.exports = router;
