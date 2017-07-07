/* eslint-disable no-restricted-syntax, guard-for-in, prefer-rest-params */
'use strict';

// bind 'this' to true to use defaults-only version
const merge = function() {
  const args = Array.from(arguments);
  const useDefaults = args[0];
  const destObject = {};
  args.slice(1, args.length).forEach((prop) => {
    for (const propName in prop) {
      if (useDefaults && args[1][propName] === undefined) {
        return;
      }
      const propValue = prop[propName];
      if (Array.isArray(propValue)) {
        destObject[propName] = propValue;
        continue;
      }
      if (typeof propValue === 'object' && typeof destObject[propName] !== 'undefined') {
        if (typeof destObject[propName] !== 'object') {
          destObject[propName] = propValue;
          continue;
        }
        destObject[propName] = module.exports.defaults(destObject[propName], propValue);//.bind(true);
      } else {
        destObject[propName] = propValue;
      }
    }
  });
  return destObject;
};

module.exports = function() {
  const args = Array.from(arguments);
  args.unshift(false);
  return merge.apply(null, args);
};

module.exports.defaults = function() {
  const args = Array.from(arguments);
  args.unshift(true);
  return merge.apply(null, args);
};
