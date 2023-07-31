import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface WithPublicRouteProps {
  children: JSX.Element | JSX.Element[];
}

export default function WithUnverifiedRoute({
  children,
}: WithPublicRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // No need for loading check since loading must be true if !currentUser
    if (user && isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  // Can't do loading check otherwise static render won't work
  return <>{!user && children}</>;
}
