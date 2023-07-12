import { createContext, useState } from 'react';
import { merge } from 'lodash';
import { ECMLayoutSettings } from 'app/components/ECMLayout/settings';

const SettingsContext = createContext({
  settings: ECMLayoutSettings,
  updateSettings: () => {}
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || ECMLayoutSettings);

  const handleUpdateSettings = (update = {}) => {
    const marged = merge({}, currentSettings, update);
    setCurrentSettings(marged);
  };

  return (
    <SettingsContext.Provider
      value={{ settings: currentSettings, updateSettings: handleUpdateSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
