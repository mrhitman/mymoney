import {Dimensions} from 'react-native';

export function getWidth(percents: number) {
  return (Dimensions.get('screen').width / 100) * percents;
}

export function getHeight(percents: number) {
  return (Dimensions.get('screen').height / 100) * percents;
}
