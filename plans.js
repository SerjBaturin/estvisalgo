const fs = require('fs')
var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "vendors.paddle.com",
  "port": null,
  "path": "/api/2.0/subscription/plans",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

const arr = []

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    arr.push(body.toString());
    fs.writeFileSync("outPlans.js", arr.join('\n'))
  });
});

req.write(qs.stringify({vendor_id: 39193, vendor_auth_code: '938dbfaecc1b9a4bf670aaf4e640ac6c2efe06168c5a51c3a7'}));
req.end();
