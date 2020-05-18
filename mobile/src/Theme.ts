import {Colors, ThemeManager} from 'react-native-ui-lib';

export function Init(theme: 'light' | 'dark' | 'light') {
  InitColors();
  switch (theme) {
    case 'light':
      return InitLightTheme();
    case 'dark':
      return InitDarkTheme();
    default:
      return InitLightTheme();
  }
}

function InitColors() {
  Colors.loadColors({});
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
