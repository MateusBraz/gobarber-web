import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
// import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    // const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // user && token ?
    if (user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token: 'bearer klrijntgrinneni23e2o4ninbion24in',
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    // const { token, user } = response.data;

    // localStorage.setItem('@GoBarber:token', token);
    // localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    // api.defaults.headers.authorization = `Bearer ${token}`;

    const id = '1';
    const name = 'Mateus Braz';
    const avatarUrl = 'https://avatars.githubusercontent.com/u/49259178?v=4';
    const user = {
      id,
      name,
      email,
      password,
      avatarUrl,
    };
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token: 'bearer klrijntgrinneni23e2o4ninbion24in', user });
  }, []);

  const signOut = useCallback(() => {
    // localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token, setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
