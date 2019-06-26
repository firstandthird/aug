# aug.js

[![Build Status](https://travis-ci.org/firstandthird/aug.svg?branch=master)](https://travis-ci.org/firstandthird/aug)
![npm](https://img.shields.io/npm/v/aug.svg)

aug.js is simple augment/extend library. If you've used jQuery's $.extend, then you will be familiar with it.

## Installation

```sh
npm install aug
```

## Usage

### Deep Merge

```javascript
const person = { info: { first: 'bob', last: 'smith' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const pet = { pet: { name: 'sparky' } };
const merged = aug(person, address, pet);
//merged == { info: { first: 'bob', last: 'jones', age: 5 }, address: '123 main st ', pet: { name: 'sparky } };
//person, address, pet objects stay the same
```

### Defaults

Only merge if it exists in the first argument

```javascript
const person = { info: { first: 'bob', last: 'smith' } , pet: { name: '' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const pet = { pet: { name: 'sparky' } };
const merged = aug.defaults(person, address, pet);
//merged == { info: { first: 'bob', last: 'jones' }, pet: { name: 'sparky' }}
//person, address, pet objects stay the same
```
