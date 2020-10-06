const fs = require('fs')
const out = 'out.txt'

const allPlans = ["Base", "Customer service", "Documentation", "Management", "VoIP INTEGRATION", "QUICKBOOKS INTEGRATION"]

const options = [
  "Base", 
  "Base and Customer service", "Base and Documentation", "Base and Management",
  "Base and Customer service and Documentation", "Base and Customer service and Management",
  "Base and Documentation and Management", "Base and Customer service and Documentation and Management"]

const months = [1, 3, 6, 12]

const integrations = [
  "void",
  "VoIP INTEGRATION",
  "QUICKBOOKS INTEGRATION",
  "VoIP INTEGRATION + QUICKBOOKS INTEGRATION"
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

  integrations.map(integration => {
    options.map(option => {
      months.map((month, i) => {
        users.map(user => {
          arr.push(option + ' + ' + user + ' users' + ' + ' + month + ' mo' + ` ${integration === 'void' ? '' : integration}`)
        })
      })
    })
    fs.writeFileSync(out, arr.join('\n'))
  })
  

