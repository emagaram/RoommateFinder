import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import { useRouter } from "next/router";
import { Button, Container, Form } from "react-bootstrap";
import Link from "next/link";
import WithPublicRoute from "./components/navigation/withPublicRoute";

export default function SignupPage() {
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router
        .push("/")
        .catch(() => console.log("Couldn't redirect to dashboard"));
    }
  }, [isAuthenticated]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <WithPublicRoute>
      <Container className="d-flex justify-content-center mt-5">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email);
            console.log(password);
            signIn({ email, password }).catch();
          }}
          style={{ maxWidth: "500px" }}
        >
          <h1 className="display-4 fw-bold mb-5">Login</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>

          <Form.Group className="ms-md-auto">
            <Button
              size="lg"
              className="w-100 w-lg-auto px-lg-5 py-lg-2 mb-2"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <div>
              {/* <Link href="/forgot-password">Reset your password</Link> */}
            </div>
            <div>
              <Link href="/signup">Don't have an account?</Link>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </WithPublicRoute>
  );
}
