/* eslint-disable no-use-before-define */
const aug = (...args) => {
  args.unshift(false);
  return merge.apply(null, args);
};

aug.defaults = (...args) => {
  args.unshift(true);
  return merge.apply(null, args);
};

// first arg is 'true' if using defaults-only version
// first arg is 'false' if just doing deep merge:
function merge(...args) {
  const useDefaults = args[0];
  const destObject = {};

  // for each object in the rest of the argument list:
  args.slice(1, args.length).forEach((prop) => {
    // for each property in the current object:
    Object.keys(prop).forEach(propName => {
      // default-only mode skips the property if it's not present in the first object
      if (useDefaults && args[1][propName] === undefined) {
        return;
      }
      // get the value we are going to assign to the dest object:
      const propValue = prop[propName];

      // if that value is an array just assign it to the dest object:
      if (Array.isArray(propValue)) {
        destObject[propName] = propValue;
        return;
      }
      // if the source and destination values are both objects then recursively merge them:
      if (typeof propValue === 'object' && typeof destObject[propName] === 'object') {
        // get the right merging function for the recursive merge:
        const merger = useDefaults ? aug.defaults : aug;
        destObject[propName] = merger(destObject[propName], propValue);
        return;
      }
      // otherwise just assign the value to the destination object:
      destObject[propName] = propValue;
    });
  });
  return destObject;
}

export default aug;
