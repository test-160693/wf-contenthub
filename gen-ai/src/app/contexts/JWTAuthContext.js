import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { GenLoading } from 'app/components';
import urls from '../urls';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

const reducer = (state, action) => {
  console.log("action type === "+action.type);
  console.log("isAuthenticated === "+action.payload);
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("children === "+children);
  const login = async (tenant, email, password) => {
    const headers = {
      'tenant_name': tenant
    };
    const response = await axios.post(urls.HOST_URL+'/api/users/login', { email, password }, {headers});
    const user = response.data;
    localStorage.setItem('tenant_name', tenant);
    dispatch({ type: 'LOGIN', payload: { user } });
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/profile');
        console.log("data === "+data.user);
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <GenLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
