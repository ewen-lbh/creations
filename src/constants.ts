const chalk = require('chalk')

const statusIcons = {
  ongoing: '',
  cancelled: chalk`{red C}`,
  archived: chalk`{yellow A}`,
}
const configFiles = {
  record: 'creations.toml',
  templates: 'templates',
}

export { statusIcons, configFiles }
