# aug.js
Aug.js is simple augment/extend library.  If you've used jQuery's $.extend, then you will be familiar with it.

## Installation

	npm install aug

## Usage

### Deep Merge

```javascript
const person = { info: { first: 'bob', last: 'smith' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const merged = aug(person, address);
//merged == { info: { first: 'bob', last: 'jones', age: 5 }, address: '123 main st ' }
//person and address objects stay the same
```

### Defaults
Only merge if it exists

```javascript
const person = { info: { first: 'bob', last: 'smith' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const merged = aug.defaults(person, address);
//merged == { info: { first: 'bob', last: 'jones' } }
//person and address objects stay the same
```
