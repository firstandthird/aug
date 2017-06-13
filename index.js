'use strict';

const functions = {
  deep(...args) {
    const org = {};
    args.forEach((prop) => {
      for (const propName in prop) {
        const propValue = prop[propName];
        if (typeof propValue === 'object' && typeof org[propName] !== 'undefined') {
          module.exports.deep(org[propName], propValue);
        } else {
          args[0][propName] = propValue;
          org[propName] = propValue;
        }
      }
    });
    return org;
  },
  strict(...args) {
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
  },
  defaults(...args) {
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
  }
};

module.exports = (...args) => {
  if (typeof args[0] === 'string') {
    throw new Error(`aug v1.0.0 and higher require you to call with "aug.${args[0]} not aug("${args[0]}")"`);
  }
  if (typeof args[0] === 'boolean') {
    throw new Error('aug v1.0.0 and higher require you to use "aug.deep(...)" instead of "aug(true, ....)"');
  }
  const org = {};
  args.forEach((prop) => {
    for (const propName in prop) {
      const propValue = prop[propName];
      args[0][propName] = propValue;
      org[propName] = propValue;
    }
  });
  return org;
};
module.exports.deep = functions.deep;
module.exports.defaults = functions.defaults;
module.exports.strict = functions.strict;
