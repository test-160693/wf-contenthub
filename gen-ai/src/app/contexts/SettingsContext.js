import { createContext, useState } from 'react';
import { merge } from 'lodash';
import { GenLayoutSettings } from 'app/components/GenLayout/settings';

const SettingsContext = createContext({
  settings: GenLayoutSettings,
  updateSettings: () => {}
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || GenLayoutSettings);

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
