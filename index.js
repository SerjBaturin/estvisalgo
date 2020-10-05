var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "vendors.paddle.com",
  "port": null,
  "path": "/api/2.0/subscription/plans_create",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

  req.write(qs.stringify({
    vendor_id: 39193,
    vendor_auth_code: '938dbfaecc1b9a4bf670aaf4e640ac6c2efe06168c5a51c3a7',
    plan_name: plan,
    plan_trial_days: 123,
    plan_length: 123,
    plan_type: 'day',
    main_currency_code: 'USD',
    initial_price_usd: 'string',
    initial_price_gbp: 'string',
    initial_price_eur: 'string',
    recurring_price_usd: 'string',
    recurring_price_gbp: 'string',
    recurring_price_eur: 'string'
  }));
  req.end();
