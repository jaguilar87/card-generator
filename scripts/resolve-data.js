const fs = require('fs');
const { join, parse } = require('path');

const BASE_DIR = join(__dirname, '..', 'data');

const data = {};

for (const system of fs.readdirSync(BASE_DIR)) {
  const sysdir = join(BASE_DIR, system);
  data[system] = {
    references: {},
    catalogs: {}
  };

  for (const reference of fs.readdirSync(join(sysdir, 'references'))) {
    const path = join(sysdir, 'references', reference);
    data[system].references[parse(reference).name] = require(path);
  }

  for (const card of fs.readdirSync(join(sysdir, 'catalogs'))) {
    const path = join(sysdir, 'catalogs', card);
    data[system].catalogs[parse(card).name] = require(path);
  }
}

fs.writeFileSync(
  join(__dirname, '..', 'public', 'data.json'),
  JSON.stringify(data, null, process.env.ENV === 'production' ? 0 : 2)
);
