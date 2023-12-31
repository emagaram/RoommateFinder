import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { setToken } from "~/utils/api";
//TODO fix types, aws-amplify package issue
export interface IAuthContextType {
  user: CognitoUser | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  unverifiedAccount: { email: string; password: string };
  signIn: (p: { email: string; password: string }) => Promise<any>;
  signOut: () => Promise<any>;
  signUp: (p: { email: string; password: string }) => Promise<any>;
  confirmAccount: (p: { code: string }) => Promise<any>;
}

// Create a context object
export const AuthContext = React.createContext<IAuthContextType>({
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  unverifiedAccount: {
    email: "",
    password: "",
  },
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  confirmAccount: async () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [unverifiedAccount, setUnverifiedAccount] = useState({
    email: "",
    password: "",
  });
  const fetchAuthUser = async () => {
    try {
      console.log("fetchingAuthUser");
      const fetchedUser = await Auth.currentAuthenticatedUser();
      setToken(
        (fetchedUser as CognitoUser)
          .getSignInUserSession()
          ?.getAccessToken()
          .getJwtToken() || "Undefined"
      );
      setIsAuthenticating(false);
      setUser(fetchedUser);
    } catch (err) {
      console.log("asda");
      setIsAuthenticating(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchAuthUser();

    // listening for auth change events
    const authListener = Hub.listen(
      "auth",
      async ({ payload: { event, data } }) => {
        console.log("Auth Status Changed Event: ", event);
        console.log("Auth Status Changed Data: ", data);
        switch (event) {
          case "signIn":
            await fetchAuthUser();
            break;
          case "signOut":
            setUser(null);
            break;
          case "signIn_failure":
          case "signUp_failure":
            if (user) {
              setUser(null);
            }
            break;
          case "signUp":
            await fetchAuthUser();
            break;
          case "forgotPassword":
          case "forgotPasswordSubmit":
          case "forgotPasswordSubmit_failure":
          case "forgotPassword_failure":
            break;
          default:
            await fetchAuthUser();
        }
      }
    );

    // cleanup
    return () => {
      authListener();
    };
  }, []);

  /**
   * log user in
   * @param email
   * @param password
   */
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await Auth.signIn({ username: email, password });
  };

  /**
   * create new user account
   * @param email
   * @param password
   * @param firstName
   * @param lastName
   */
  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await Auth.signUp({
      username: email,
      password,
    });
    setUnverifiedAccount({ email, password });
  };

  const confirmAccount = async ({ code }: { code: string }) => {
    await Auth.confirmSignUp(unverifiedAccount?.email, code);
    await signIn({
      email: unverifiedAccount?.email,
      password: unverifiedAccount?.password,
    });
  };

  /**
   * logout user
   */
  const signOut = async () => {
    Auth.signOut();
    setToken("Undefined");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthenticating,
    unverifiedAccount,
    signIn,
    signOut,
    signUp,
    confirmAccount,
  };

  if (isAuthenticating) {
    return <>Loading</>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
