const qs = require("querystring");
const http = require("https");

const options = [
  "Base", "Base + Customer service", "Base + Documentation", "Base + Management",
  "Base + Customer service + Documentation", "Base + Customer service + Management",
  "Base + Documentation + Management", "Base + Customer service + Documentation + Management"]

const months = [1, 3, 6, 12]

const integrations = [
  "void",
  "VoIP integration",
  "QuickBooks integration",
  "VoIP + QuickBooks integration"
]

const users = [10, 20, 30, "unlimited"]

const getOptionCost = (option, month) => {
  switch (option) {
    case "Base":
      return {1: 199, 3: 549, 6: 999, 12: 1799}[month]
      break;
    case "Base + Customer service":
      return {1: 398, 3: 1098, 6: 1998, 12: 3598}[month]
      break;
    case "Base + Documentation":
      return {1: 398, 3: 1098, 6: 1998, 12: 3598}[month]
      break;
    case "Base + Management":
      return {1: 398, 3: 1098, 6: 1998, 12: 3598}[month]
      break;
    case "Base + Customer service + Documentation":
      return {1: 597, 3: 1647, 6: 2997, 12: 5397}[month]
      break;
    case "Base + Customer service + Management":
      return {1: 597, 3: 1647, 6: 2997, 12: 5397}[month]
      break;
    case "Base + Documentation + Management":
      return {1: 597, 3: 1647, 6: 2997, 12: 5397}[month]
      break;
    case "Base + Customer service + Documentation + Management":
      return {1: 796, 3: 2196, 6: 3996, 12: 7196}[month]
      break;
    default:
      break;
  }
}

const getOneYear = (x) => {
  switch (x) {
    case 1:
      return `${x} month`
      break;
    case 3:
      return `${x} months`
      break;
    case 6:
      return `${x} months`
      break;
    case 12:
      return '1 year'
      break;
    default:
      break;
  }
}

const getIntegrationCost = (x) => {
  switch (x) {
    case "void":
      return 0
      break;
    case "VoIP integration":
      return 29
      break;
    case "QuickBooks integration":
      return 29
      break;
    case "VoIP + QuickBooks integration":
      return 58
      break;
    default:
      break;
  }
}

const getUserCost = (x) => {
  switch (x) {
    case 10:
      return 0
      break;
    case 20:
      return 150
      break;
    case 30:
      return 300
      break;
    case "unlimited":
      return 399
      break;
    default:
      break;
  }
}

const price = (option, y, z, i, month) => getOptionCost(option, month) + getIntegrationCost(y) + getUserCost(z)

const arr = []
const outPlans = []

integrations.map(integration => {
options.map(option => {
  months.map((month, i) => {
    users.map(user => {
      arr.push(
          
          { 
            plan_name: option + `${integration === 'void' ? '' : ' + ' + integration}` + ' (' + user + ' users' + ', ' + getOneYear(month) + ')',
            plan_trial_days: 0,
            plan_length: month,
            plan_type: 'month',
            main_currency_code: 'USD',
            initial_price_usd: '0.00',
            recurring_price_usd: price(option, integration, user, i, month), 
          }

        )
      })
    })
  })
})

arr.map(item => {
  outPlans.push({name: item.plan_name, month: item.plan_length, price: item.recurring_price_usd})
})

const send = (obj) => {
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
      plan_name: obj.name,
      plan_trial_days: 0,
      plan_length: obj.month,
      plan_type: 'month',
      main_currency_code: 'USD',
      initial_price_usd: '0.00',
      recurring_price_usd: obj.price, 
    }));
    req.end();
}

outPlans.map((obj, i) => {
  setTimeout(() => {
    send(obj)
  }, 1000 * i)
})