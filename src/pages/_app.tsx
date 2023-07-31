import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.scss";
import { Amplify } from "aws-amplify";
import cognito from "../cognito";
import AuthProvider from "./contexts/AuthContext";
Amplify.configure(cognito);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
