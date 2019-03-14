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

function findOldestPerson(people) {
  return people.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
}

const oldestPerson = findOldestPerson(PEOPLE);

console.log(`The oldest person is ${oldestPerson.name}.
He is ${oldestPerson.age} years old.`);
