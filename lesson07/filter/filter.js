#!/usr/bin/env node

const PEOPLE = [
  {
    name: "Alice",
    age: 24
  },
  {
    name: "Bob",
    age: 55
  },
  {
    name: "Eve",
    age: 19
  },
  {
    name: "Mallory",
    age: 31
  },
  {
    name: "Trent",
    age: 52
  }
];

function findPeopleOlderThan(people, age) {
  return people.filter((person) => person.age > age);
}

if (process.argv.length < 3) {
  console.log('usage: ./filter.js AGE');
  process.exit(-1);
}

const age = parseInt(process.argv[2]);

const olderPeople = findPeopleOlderThan(PEOPLE, age);

console.log(`People older than ${age}:\n`);

olderPeople.forEach((person) => {
  console.log(`  * ${person.name} (${person.age})`);
});
