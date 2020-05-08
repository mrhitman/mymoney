import {ThemeManager} from 'react-native-ui-lib';

export function Init(theme: 'light' | 'dark' = 'light') {
  switch (theme) {
    case 'light':
      return InitLightTheme();
    case 'dark':
      return InitDarkTheme();
    default:
      return InitLightTheme();
  }
}

function InitLightTheme() {
  ThemeManager.setComponentTheme('Card', {});
  ThemeManager.setComponentTheme('View', {
    borderWidth: 0.3,
    borderColor: 'red',
  });
  ThemeManager.setComponentTheme('Text', {});
}
function InitDarkTheme() {}
