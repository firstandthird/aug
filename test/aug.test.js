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

test('should take N number of objects', (t) => {
  t.plan(4);
  const o1 = { a: 1, d: 7 };
  const o2 = { a: 2, b: 4 };
  const o3 = { a: 3, b: 5, c: 1 };
  const merge = aug(o1, o2, o3);
  t.equal(merge.a, 3);
  t.equal(merge.b, 5);
  t.equal(merge.c, 1);
  t.equal(merge.d, 7);
});

test('supports deep extend', (t) => {
  t.plan(3);
  const o1 = { a: { b: 1, c: 3 }, d: 1 };
  const o2 = { a: { b: 2 } };
  const merged = aug(o1, o2);
  t.equal(merged.a.b, 2);
  t.equal(merged.a.c, 3);
  t.equal(merged.d, 1);
});

test('objects should override basic values', (t) => {
  t.plan(1);
  const o1 = { a: { b: 1, c: 3 }, d: 1 };
  const o2 = { a: { b: { x: 1 } } };
  const merged = aug(o1, o2);
  t.deepEqual({
    a: {
      b: {
        x: 1
      },
      c: 3
    },
    d: 1
  }, merged);
});

test('should handle deep extends if root doesn\'t exist', (t) => {
  t.plan(1);
  const o1 = { };
  const o2 = { a: { b: 2 } };
  const merged = aug(o1, o2);
  t.equal(merged.a.b, 2);
});

test('should handled multiple levels', (t) => {
  t.plan(2);
  const o1 = { a: { b: { c: 0, d: 1 } } };
  const o2 = { a: { b: { c: 1 } } };
  const merged = aug(o1, o2);
  t.equal(merged.a.b.c, 1);
  t.equal(merged.a.b.d, 1);
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
  const r = aug(o1, o2);
  t.equal(r.tasks.prod[0], 'initialize');
  t.equal(r.tasks.prod[1][0], 'scripts');
});

test('should not change first param', (t) => {
  const o1 = { a: 1 };
  const o2 = { b: 2 };
  aug(o1, o2);
  t.deepEqual(o1, { a: 1 });
  t.end();
});

test('defaults should work with multiple objects', (t) => {
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

test('should overwrite only whats existing in defaults', (t) => {
  const person = { info: { first: 'bob', last: 'smith' }, pet: { name: '' } };
  const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
  const pet = { pet: { name: 'sparky' } };
  const merged = aug.defaults(person, address, pet);
  t.deepEqual(person, { info: { first: 'bob', last: 'smith' }, pet: { name: '' } }, 'does not modify original object');
  t.deepEqual(address, { info: { last: 'jones', age: 5 }, address: '123 main st' }, 'does not modify original object');
  t.deepEqual(merged, { info: { first: 'bob', last: 'jones' }, pet: { name: 'sparky' } }, 'only overrides merged object');
  t.end();
});
