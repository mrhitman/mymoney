import { types, Instance } from 'mobx-state-tree';

export enum Language {
  en = 'en',
  ru = 'ru',
}

export const LanguageAlias: Record<string, string> = {
  [Language.en]: 'English',
  [Language.ru]: 'Русский',
};

export const AccountSettings = types.model('AccountSettings', {
  language: types.optional(
    types.enumeration(Object.keys(Language)),
    Language.en,
  ),
  primaryCurrencyName: types.optional(types.string, 'UAH'),
  usePassword: types.optional(types.boolean, false),
  useFingerprint: types.optional(types.boolean, false),
  password: types.optional(types.string, '0000'),
  lockDownTime: types.optional(types.integer, 180),
  dateFormat: types.optional(types.string, 'yyyy LLL dd'),
});

export const Account = types
  .model('Account', {
    firstName: types.maybe(types.string),
    middleName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    email: types.maybe(types.string),
    settings: AccountSettings,
  })
  .actions((self) => {
    function update(args: Partial<Instance<typeof Account>>) {
      for (let arg in args) {
        // @ts-ignore-next-line
        self[arg] = args[arg];
      }
    }

    return { update };
  });
