import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ECMTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <ECMTheme>
          <CssBaseline />
          {content}
        </ECMTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
