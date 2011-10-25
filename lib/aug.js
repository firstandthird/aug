var aug = function() {
  var args = Array.prototype.slice.call(arguments);
  var org = args.shift();
  if (typeof org === "function") org = org.prototype;
  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      org[name] = prop[name];
    }
  }
  return org;
};
