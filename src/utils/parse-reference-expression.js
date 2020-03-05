export default function parseReference(expression) {
  if (typeof expression !== 'string' || !expression.startsWith('$')) {
    return expression;
  }

  const matches = expression.match(/\$(.+):(.+)/);

  if (!matches) {
    return expression;
  }

  const [, libraryId, referenceId] = matches;

  return { referenceId, libraryId };
}
