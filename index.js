/* eslint-disable no-restricted-syntax, guard-for-in, prefer-rest-params */
'use strict';
module.exports = function() {
  const args = Array.from(arguments);
  const org = args[0];
  args.forEach((prop) => {
    for (const propName in prop) {
      const propValue = prop[propName];
      if (Array.isArray(propValue)) {
        args[0][propName] = propValue;
        org[propName] = propValue;
        continue;
      }
      if (typeof propValue === 'object' && typeof org[propName] !== 'undefined') {
        if (typeof org[propName] !== 'object') {
          args[0][propName] = propValue;
          org[propName] = propValue;
          continue;
        }
        module.exports.deep(org[propName], propValue);
      } else {
        args[0][propName] = propValue;
        org[propName] = propValue;
      }
    }
  });
  return org;
};
module.exports.deep = module.exports;
module.exports.strict = function() {
  const args = Array.from(arguments);
  const org = {};
  args.forEach((prop) => {
    for (const propName in prop) {
      if (args[0][propName]) {
        const propValue = prop[propName];
        args[0][propName] = propValue;
        org[propName] = propValue;
      }
    }
  });
  return org;
};

module.exports.defaults = function() {
  const args = Array.from(arguments);
  const org = {};
  args.forEach((prop) => {
    for (const propName in prop) {
      if (args[0][propName] !== undefined) {
        const propValue = prop[propName];
        org[propName] = propValue;
      }
    }
  });
  return org;
};
