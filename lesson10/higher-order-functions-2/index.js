const ar = [1,2,3,4,5,6,7,8,9,10];

function forEach(ar, fn) {
  for (let i = 0; i < ar.length; i += 1) {
    const el = ar[i];
    fn(el, i, ar);
  }
}

// forEach(ar, (item, i) => console.log(i, item));

function filter(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    const el = ar[i];

    if (fn(el, i, ar)) {
      rv.push(el);
    }
  }

  return rv;
}

// const evenNumbers = filter(ar, (item) => item % 2 === 0);
// console.log(evenNumbers);

function map(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    const el = ar[i];
    rv.push(fn(el, i, ar));
  }

  return rv;
}

// const squares = map(ar, (item) => item ** 2);
// console.log(squares);

module.exports = { forEach, map, filter };
