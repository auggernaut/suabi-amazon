var express = require('express');
const {OperationHelper} = require('apac');
var router = express.Router();

var AWS_ID = process.env.AWS_ID || fail("cannot have an empty AWS_ID");
var AWS_SECRET = process.env.AWS_SECRET || fail("cannot have an empty AWS_SECRET");
var AWS_ASSOCID = process.env.AWS_ASSOCID || fail("cannot have an empty AWS_ASSOCID");

const opHelper = new OperationHelper({
    awsId:     AWS_ID,
    awsSecret: AWS_SECRET,
    assocId:   AWS_ASSOCID
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  opHelper.execute('ItemLookup', {
    'ItemId': req.params.id,
    // 'IdType': 'ASIN&',
    'ResponseGroup': 'Images'
  }).then((response) => {
      // console.log("Results object: ", response.result);
      // console.log("Raw response body:", response.responseBody);
      res.send(response.result.ItemLookupResponse.Items.Item);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
      res.send('Failsauce');
  });
});

module.exports = router;
