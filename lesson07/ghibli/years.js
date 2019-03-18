#!/usr/bin/env node

const axios = require('axios');

axios
  .get('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    const table = response.data
      .map(x => x.release_date)
      .reduce((acc, cur) => {
        const rv = {...acc};
        rv[cur] = rv[cur] ? rv[cur] + 1 : 1;
        return rv;
      }, {});

    Object.keys(table).forEach((year) => {
      console.log(`${year}: ${table[year]}`);
    });
  });
