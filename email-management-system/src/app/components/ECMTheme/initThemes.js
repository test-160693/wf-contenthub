import { createTheme } from '@mui/material';
import { forEach, merge } from 'lodash';
import { themeColors } from './themeColors';
import themeOptions from './themeOptions';

function createECMThemes() {
  let themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });

  return themes;
}

export const themes = createECMThemes();
