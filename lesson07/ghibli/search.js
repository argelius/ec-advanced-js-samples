#!/usr/bin/env node

const axios = require('axios');
const query = process.argv[2];

axios
  .get('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    response.data
      .map(x => x.title)
      .filter(x => x.toLowerCase().includes(query.toLowerCase()))
      .forEach(x => console.log(x));
  });
