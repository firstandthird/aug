module('aug', { });

test('override', function() {
  var a = { a: 1 };
  var b = { a: 2 };

  aug(a, b);
  equal(a.a, 2);

});
test('extend', function() {
  var a = { a: 1 };
  var b = { b: 2 };

  aug(a, b);
  equal(a.a, 1);
  equal(a.b, 2);
});
test('override twice', function() {
  var a = { a: 1 };
  var b = { a: 2 };
  var c = { a: 3 };

  aug(a, b, c);
  equal(a.a, 3);
});
test('extend twice', function() {
  var a = { a: 1 };
  var b = { b: 2 };
  var c = { c: 3 };

  aug(a, b, c);
  equal(a.a, 1);
  equal(a.b, 2);
  equal(a.c, 3);
});

test('return', function() {
  var a = { a: 1 };
  var b = { b: 2 };

  var c = aug({}, a, b);
  equal(c.a, 1);
  equal(c.b, 2);
});

test('extend prototype', function() {
  var Class1 = function() {
  };
  Class1.prototype.test = function() {
    return true;
  };

  aug(Class1.prototype, {
    test: function() {
      return false;
    },
    test2: function() {
      return true;
    }
  });
  var c = new Class1();
  equal(c.test(), false);
  equal(c.test2(), true);
  Class1.prototype.test3 = function() {
    return true;
  };
  equal(c.test3(), true);
});

test('extend function', function() {
  var f = function() {};
  aug(f, {
    prop: 42
  });
  equal(f.prop, 42);
});
