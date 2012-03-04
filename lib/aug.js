var aug = function __aug() {
  var args = Array.prototype.slice.call(arguments);
  var org = args.shift();
  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      org[name] = prop[name];
    }
  }
  return org;
};
if (typeof window === 'undefined') module.exports = aug;
