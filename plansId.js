const fs = require('fs')
const plans = require('./outPlans')

const plansId = []

plans.map(plan => plansId.push(plan.id))

fs.writeFileSync('id.js', plansId.join(',\n'))