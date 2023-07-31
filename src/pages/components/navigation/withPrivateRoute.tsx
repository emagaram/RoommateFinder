import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface WithPrivateRouteProps {
  children: JSX.Element | JSX.Element[];
}
export default function withPrivateRoute({ children }: WithPrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // No need for loading check since loading must be true if !currentUser
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  // Can't do loading check otherwise static render won't work
  return <>{isAuthenticated && children}</>;
}
