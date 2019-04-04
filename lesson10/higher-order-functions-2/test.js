#!/usr/bin/env node

const axios = require('axios');
const query = process.argv[2];

const { map, filter, forEach } = require('./index');

axios
  .get('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    const titles = map(response.data, x => x.title);
    const filteredTitles = filter(titles, x =>
      x.toLowerCase().includes(query.toLowerCase()));
    forEach(filteredTitles, title => console.log(title));

    /*response.data
      .map(x => x.title)
      .filter(x => x.toLowerCase().includes(query.toLowerCase()))
      .forEach(x => console.log(x));*/
  });
