import expand from './expand';

export default function expandCollection(references, collection) {
  if (!references) {
    return collection;
  }

  if (!Array.isArray(collection)) {
    return expand(references, collection);
  }

  return collection.reduce((unique, item) => {
    const expandedItem = expand(references, item);

    return unique.includes(expandedItem) ? unique : [...unique, expandedItem];
  }, []);
}
