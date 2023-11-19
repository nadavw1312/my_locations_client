import { createContext, useEffect, useReducer, useRef } from "react";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";
import userService from "../services/userService";

interface IAuth {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any;
}

interface IAction {
  payload?: any;
  type: "INITIALIZE" | "LOGIN" | "LOGOUT";
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_email: string, _password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const handlers = {
  INITIALIZE: (state: IAuth, action: IAction) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: IAuth, action: IAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: IAuth) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: IAuth, action: IAction) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);

          const response = await userService.me();
          const { data: user } = response;
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const getTokens = async (username: string, password: string) => {
    const response = await userService.login(username, password);
    setSession(response.data.access_token, response.data.refresh_token);
  };

  const login = async (email: string, password: string) => {
    try {
      await getTokens(email, password);
      const response = await userService.me();
      const { data: user } = response;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
