'use strict';
const functions = {
  deep() {
    const args = Array.from(arguments);
    const org = {};
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
  },
  strict() {
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
  },
  defaults() {
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
  }
};

module.exports = function() {
  const args = Array.from(arguments);
  if (typeof args[0] === 'string') {
    throw new Error(`aug v2.0.0 and higher require you to call with "aug.${args[0]} not aug("${args[0]}")"`);
  }
  if (typeof args[0] === 'boolean') {
    throw new Error('aug v2.0.0 and higher require you to use "aug.deep(...)" instead of "aug(true, ....)"');
  }
  const org = {};
  args.forEach((prop) => {
    for (const propName in prop) { //eslint-disable-line
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
