function forEach(ar, fn) {
  for (let i = 0; i < ar.length; i += 1) {
    fn(ar[i], i);
  }
}

function filter(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    if (fn(ar[i], i)) {
      rv.push(ar[i]);
    }
  }

  return rv;
}

function map(ar, fn) {
  const rv = [];

  for (let i = 0; i < ar.length; i += 1) {
    rv.push(fn(ar[i], i));
  }

  return rv;
}

module.exports = { forEach, map, filter };
