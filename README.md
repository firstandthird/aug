<h1 align="center">aug</h1>

<p align="center">
  <a href="https://github.com/firstandthird/aug/actions">
    <img src="https://img.shields.io/github/workflow/status/firstandthird/aug/Test/main?label=Tests&style=for-the-badge" alt="Test Status"/>
  </a>
  <a href="https://github.com/firstandthird/aug/actions">
    <img src="https://img.shields.io/github/workflow/status/firstandthird/aug/Lint/main?label=Lint&style=for-the-badge" alt="Lint Status"/>
  </a>
  <img src="https://img.shields.io/npm/v/aug.svg?label=NPM&style=for-the-badge" alt="NPM Version"/>
</p>

aug is simple augment/extend library. If you've used jQuery's `$.extend`, then you will be familiar with it.

## Installation

```sh
npm install aug
```

or

```sh
yarn add aug
```


## Usage

__Deep Merge__

```javascript
import aug from 'aug';

const person = { info: { first: 'bob', last: 'smith' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const pet = { pet: { name: 'sparky' } };

const merged = aug(person, address, pet);

//merged == { info: { first: 'bob', last: 'jones', age: 5 }, address: '123 main st ', pet: { name: 'sparky } };
//person, address, pet objects stay the same
```

__Defaults__

Only merge if it exists in the first argument

```javascript
import aug from 'aug';

const person = { info: { first: 'bob', last: 'smith' } , pet: { name: '' } };
const address = { info: { last: 'jones', age: 5 }, address: '123 main st' };
const pet = { pet: { name: 'sparky' } };

const merged = aug.defaults(person, address, pet);

//merged == { info: { first: 'bob', last: 'jones' }, pet: { name: 'sparky' }}
//person, address, pet objects stay the same
```

---

<a href="https://firstandthird.com"><img src="https://firstandthird.com/_static/ui/images/safari-pinned-tab-62813db097.svg" height="32" width="32" align="right"></a>

_A [First + Third](https://firstandthird.com) Project_
