const qs = require("querystring");
const http = require("https");

const options = {
  "method": "POST",
  "hostname": "vendors.paddle.com",
  "port": null,
  "path": "/api/2.0/subscription/plans_create",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

  req.write(qs.stringify({
    vendor_id: 39193,
    vendor_auth_code: '938dbfaecc1b9a4bf670aaf4e640ac6c2efe06168c5a51c3a7',
    plan_name: 'serj test'
  }));
  req.end();
