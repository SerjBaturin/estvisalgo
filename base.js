const fs = require('fs')
const out = 'out.txt'

const options = [
  "Base", 
  "Base + Customer service", "Base + Documentation", "Base + Management",
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

const costs = [
  // BASE
  {1: 199, 3: 549, 6: 999, 12: 1799,},
  // BASE + 1
  {1: 398, 3: 1098, 6: 1998, 12: 3598,},
  // BASE + 2
  {1: 597, 3: 1647, 6: 2997, 12: 5397,},
  // BASE + 3
  {1: 796, 3: 2196, 6: 3996, 12: 7196,},
];

const arr = []
const outPlans = []

integrations.map(integration => {
  options.map(option => {
    months.map((month, i) => {
      users.map(user => {
        arr.push(
          
          { 
            plan_name: option + `${integration === 'void' ? '' : ' + ' + integration}` + ' (' + user + ' users' + ', ' + month + ' mo)',
            plan_trial_days: 0,
            plan_length: month,
            plan_type: month,
            main_currency_code: 'USD',
            initial_price_usd: costs[i][month],
            recurring_price_usd: costs[i][month], 
          }

        )
      })
    })
  })
})

arr.map(item => {
  outPlans.push(item.plan_name)
})

fs.writeFileSync(out, outPlans.join('\n'))