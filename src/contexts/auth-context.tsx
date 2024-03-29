import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CHANGE_TENANT: "CHANGE_TENANT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  tenantId: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.CHANGE_TENANT]: (state, action) => {
    const tenantId = action.payload;

    return {
      ...state,
      tenantId,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      // Check if user is authenticated
      // const isAuthenticated = await auth.isAuthenticated();
      const isAuthenticated = false;
      if (isAuthenticated) {
        // Get user from your database
        const user = {};

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  const signIn = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const changeTenant = (tenantId) => {
    dispatch({
      type: HANDLERS.CHANGE_TENANT,
      payload: tenantId,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        changeTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
