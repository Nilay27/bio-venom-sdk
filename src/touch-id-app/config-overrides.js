const path = require('path');

module.exports = function override(config, env) {
  // Allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter((plugin) => plugin.constructor.name !== 'ModuleScopePlugin');
  return config;
};
