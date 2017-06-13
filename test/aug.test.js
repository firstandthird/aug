'use strict';
const test = require('tape');
const aug = require('../index.js');

test('should override', (t) => {
  t.plan(1);
  const o1 = { a: 1 };
  const o2 = { a: 2 };
  const o = aug(o1, o2);
  t.equal(o.a, 2);
});

test('should extend', (t) => {
  t.plan(2);
  const o1 = { a: 1 };
  const o2 = { b: 2 };
  const o = aug(o1, o2);
  t.equal(o.a, 1);
  t.equal(o.b, 2);
});

test('should change first param', (t) => {
  t.plan(3);
  const o1 = { a: 1 };
  const o2 = { b: 2 };
  const o = aug(o1, o2);
  t.equal(o1.a, 1);
  t.equal(o1.b, 2);
  // console.log('----')
  // console.log(o1)
  t.deepEqual(o1, o);
});

test('should take N number of objects', (t) => {
  t.plan(4);
  const o1 = { a: 1, d: 7 };
  const o2 = { a: 2, b: 4 };
  const o3 = { a: 3, b: 5, c: 1 };
  aug(o1, o2, o3);
  t.equal(o1.a, 3);
  t.equal(o1.b, 5);
  t.equal(o1.c, 1);
  t.equal(o1.d, 7);
});

test('should extend prototypes', (t) => {
  t.plan(3);
  const Class1 = function() {
  };
  Class1.prototype.test = function() {
    return true;
  };

  aug(Class1.prototype, {
    test: () => false,
    test2: () => true
  });
  const c = new Class1();
  t.equal(c.test(), false);
  t.equal(c.test2(), true);
  Class1.prototype.test3 = function() {
    return true;
  };
  t.equal(c.test3(), true);
});

test('should extend a function', (t) => {
  t.plan(1);
  const f = () => {};
  aug(f, {
    prop: 42
  });
  t.equal(f.prop, 42);
});

test('should extend prototypes', (t) => {
  t.plan(1);
  Array.prototype.lulz = 42;
  const o = {};
  aug(o, []);
  t.equal(o.lulz, 42);
});

test('supports deep extend', (t) => {
  t.plan(3);
  const o1 = { a: { b: 1, c: 3 }, d: 1 };
  const o2 = { a: { b: 2 } };
  aug.deep(o1, o2);
  t.equal(o1.a.b, 2);
  t.equal(o1.a.c, 3);
  t.equal(o1.d, 1);
});

test('objects should override basic values', (t) => {
  t.plan(1);
  const o1 = { a: { b: 1, c: 3 }, d: 1 };
  const o2 = { a: { b: { x: 1 } } };
  aug.deep(o1, o2);
  t.deepEqual({
    a: {
      b: {
        x: 1
      },
      c: 3
    },
    d: 1
  }, o1);
});

test('should handle deep extends if root doesn\'t exist', (t) => {
  t.plan(1);
  const o1 = { };
  const o2 = { a: { b: 2 } };
  aug.deep(o1, o2);
  t.equal(o1.a.b, 2);
});

test('should handled multiple levels', (t) => {
  t.plan(2);
  const o1 = { a: { b: { c: 0, d: 1 } } };
  const o2 = { a: { b: { c: 1 } } };
  aug.deep(o1, o2);
  t.equal(o1.a.b.c, 1);
  t.equal(o1.a.b.d, 1);
});

test('strict should only copy if the property exists', (t) => {
  t.plan(2);
  const o1 = { a: 1 };
  const o2 = { b: 2, a: 2 };
  aug.strict(o1, o2);
  t.equal(o1.a, 2);
  t.equal(o1.b, undefined);
});

test('should overwrite only whats existing in defaults', (t) => {
  t.plan(6);
  const defaults = { debug: false, path: __dirname, enable: true };
  const opt = { debug: true, path: '/tmp/woot', fakeThing: 123 };
  const options = aug.defaults(defaults, opt);
  t.equal(options.debug, true);
  t.equal(options.enable, true);
  t.equal(defaults.debug, false);
  t.equal(defaults.path, __dirname);
  t.equal(options.path, '/tmp/woot');
  t.equal(options.fakeThing, undefined);
});

test('should work with multiple objects', (t) => {
  t.plan(4);
  const defaults = { debug: false, path: __dirname, enable: true };
  const o1 = { debug: true, path: '/tmp/woot', fakeThing: 123 };
  const o2 = { debug: false, path: '/tmp/woot2', fakeThing: 123 };
  const options = aug.defaults(defaults, o1, o2);
  t.equal(options.debug, false);
  t.equal(options.enable, true);
  t.equal(options.path, '/tmp/woot2');
  t.equal(options.fakeThing, undefined);
});

test('throws error if called with old-style string argument as first parameter', (t) => {
  t.plan(1);
  const o1 = { a: 1 };
  const o2 = { b: 2, a: 2 };
  try {
    aug('strict', o1, o2);
  } catch (e) {
    t.pass();
    t.end();
  }
});

test('throws error if called with old-style boolean argument as first parameter', (t) => {
  t.plan(1);
  const o1 = { a: 1 };
  const o2 = { b: 2, a: 2 };
  try {
    aug(true, o1, o2);
  } catch (e) {
    t.pass();
    t.end();
  }
});

test('somewhat real default example', (t) => {
  t.plan(1);
  const defaults = {
    plugins: {},
    env: 'production'
  };
  const env = {
    plugins: {
      loadStuff: {
        options: '123'
      }
    },
    env: 'stage'
  };
  const opts = aug({}, defaults, env);
  t.deepEqual(opts, {
    env: 'stage',
    plugins: {
      loadStuff: {
        options: '123'
      }
    }
  });
});

test('should overwrite arrays (not merge them)', (t) => {
  t.plan(2);
  const o1 = {
    tasks: {
      default: ['initialize', ['stylesheets', 'scripts'], 'watcher'],
      dev: [['updates', 'initialize'], 'watcher'],
      prod: ['default', 'hash']
    }
  };
  const o2 = {
    tasks: {
      prod: ['initialize', ['scripts', 'stylesheets']]
    }
  };
  const r = aug.deep(o1, o2);
  t.equal(r.tasks.prod[0], 'initialize');
  t.equal(r.tasks.prod[1][0], 'scripts');
});
