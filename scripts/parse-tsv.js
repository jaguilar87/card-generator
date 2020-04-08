#!/usr/bin/env node
const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.log(
    'Pass the route of a TSV file as an argument, this script will try to parse the content to a JSON file. First row must contain keys.'
  );

  process.exit(0);
}

const cards = [];
const content = fs.readFileSync(filePath).toString();
const rows = content.split('\n');
const columns = rows.shift().split('\t');
const lastColumnIndex = columns.filter(content => content.trim()).length - 1;
const lastColumn = columns[lastColumnIndex];

let lastRow;

for (const [i, row] of rows.entries()) {
  const cells = row.split('\t');
  const obj = {};

  if (!cells[0]) {
    for (const [j] of columns.entries()) {
      if (!cells[j]) {
        continue;
      }

      addToLastColumn(cards[lastRow], cells[j]);
    }

    continue;
  }

  console.error('Parsing', i, cells[0]);

  for (const [j, column] of columns.entries()) {
    const value = cells[j];

    if (!value) {
      continue;
    }

    if (j <= lastColumnIndex) {
      obj[column] = value;

      continue;
    }

    addToLastColumn(obj, value);
  }

  cards.push(obj);

  lastRow = cards.length - 1;
}

console.log(JSON.stringify(cards, null, 2));

function addToLastColumn(obj, value = '') {
  if (!Array.isArray(obj[lastColumn])) {
    obj[lastColumn] = [obj[lastColumn]];
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return;
  }

  console.error('\t^', trimmedValue);
  obj[lastColumn].push(trimmedValue);
}
