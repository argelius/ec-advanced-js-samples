function forEach(ar, fn) {
  for (let i = 0; i < ar.length; i += 1) {
    fn(ar[i]);
  }
}

function filter(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    if (fn(ar[i])) {
      rv.push(ar[i]);
    }
  }

  return rv;
}

function map(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    rv.push(fn(ar[i]));
  }

  return rv;
}

const ar = [0,1,2,3,4,5,6,7,8,9,10];

console.log("forEach");
forEach(ar, x => console.log(x));

console.log("filter");
const evenNumbers = filter(ar, x => x % 2 === 0);
console.log(evenNumbers);

console.log("map");
const squares = map(ar, x => x * x);
console.log(squares);
