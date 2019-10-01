export default function expand(references, expression) {
  references._cache = references._cache || {};

  if (references._cache[expression]) {
    return references._cache[expression];
  }

  if (!references) {
    return expression;
  }

  if (typeof expression !== 'string') {
    return expression;
  }

  if (!expression.startsWith('$')) {
    return expression;
  }

  const matches = expression.match(/\$(.+):(.+)/);

  if (!matches) {
    return expression;
  }

  const [, lib, key] = matches;
  const ref = references[lib];

  if (!ref) {
    console.error(
      'Error expanding expression: "' +
        expression +
        '". ' +
        lib +
        '.json does not exist in your references list.'
    );

    return expression;
  }

  const value = ref[key];

  if (!value) {
    console.error(
      'Error expanding expression: "' +
        expression +
        '". ' +
        key +
        ' does not exist inside ' +
        lib +
        '.json file.'
    );

    return expression;
  }

  references._cache[expression] = value;

  return value;
}
