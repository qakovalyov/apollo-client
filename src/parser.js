import { parse } from 'graphql/language';
import { isString } from 'lodash';

export function parseIfString(doc) {
  let parsed = doc;

  if (isString(doc)) {
    parsed = parse(doc);
  }

  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  return parsed;
}

export function parseFragmentIfString(fragment) {
  const parsedFragment = parseIfString(fragment);

  if (parsedFragment.definitions.length !== 1) {
    throw new Error('Must have exactly one definition in document.');
  }

  if (parsedFragment.definitions[0].kind !== 'FragmentDefinition') {
    throw new Error('Must be a fragment.');
  }

  const fragmentDef = parsedFragment.definitions[0];

  return fragmentDef;
}