const fs = require('fs')
const out = 'out.txt'

const allPlans = ["Base", "Customer service", "Documentation", "Management", "VoIP INTEGRATION", "QUICKBOOKS INTEGRATION"]

const options = ["Customer service", "Documentation", "Management", "Customer service and Documentation", "Customer service and Management", "Documentation and Management", "Customer service / Documentation / Management"]

const months = [1, 3, 6, 12]

const integrations = [
  "void",
  "VoIP INTEGRATION",
  "QUICKBOOKS INTEGRATION",
  "VoIP INTEGRATION + QUICKBOOKS INTEGRATION"
]

const users = [0, 150, 300, 399]

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

integrations.map(integration => {
  
    options.map(option => {
      months.map((month, i) => {
        users.map(user => {
          arr.push(integration === 'void' ? 'Base + ' + user + ' + ' + costs[i][month] : 'Base + ' + integration + ' + ' + user + ' + ' + costs[i][month] + ' + ' + option)
        })
      })
    })
  
  fs.writeFileSync(out, arr.join('\n'))
})