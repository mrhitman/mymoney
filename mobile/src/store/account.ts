import {types} from 'mobx-state-tree';

export enum Language {
  en = 'en',
  ru = 'ru',
}

export const Account = types.model('Account', {
  first_name: types.maybe(types.string),
  middle_name: types.maybe(types.string),
  last_name: types.maybe(types.string),
  email: types.maybe(types.string),
  token: types.maybe(types.string),
  refresh_token: types.maybe(types.string),
  language: types.optional(
    types.enumeration(Object.keys(Language)),
    Language.en,
  ),
  primaryCurrencyName: types.optional(types.string, 'UAH'),
  usePassword: types.optional(types.boolean, false),
  useFingerprint: types.optional(types.boolean, false),
  password: types.optional(types.string, '0000'),
  lockdownAfter: types.optional(types.integer, 180),
  dateFormat: types.optional(types.string, 'yyyy LLL dd'),
});
