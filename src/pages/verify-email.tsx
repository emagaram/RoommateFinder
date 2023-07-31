import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import ReactCodeInput from "react-verification-code-input";
import { Auth } from "aws-amplify";

export default function VerifyEmailPage() {
  //TODO use global style tag
  const router = useRouter();
  const { email } = router.query as { email: string };
  const [emailVerified, setEmailVerified] = useState(false);
  return (
    <>
      <Container className="container-center-below-navbar flex-lg-column">
        <Head>
          <title>Verify Email</title>
        </Head>
        <Row className="mb-5">
          <Col style={{ color: "white" }} className="fs-3 text-center">
            Verify your email.
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center" style={{ maxWidth: "34.375em" }}>
            {!emailVerified && (
              <VerifyCard email={email} setEmailVerified={setEmailVerified} />
            )}
            {emailVerified && <EmailVerified email={email} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

function EmailVerified(props: { email: string }) {
  const router = useRouter();
  return (
    <div
      style={{
        borderRadius: "0.5em",
        color: "black",
        marginBottom: "100px",
        border: "1px solid lightgray",
      }}
      className="d-flex flex-column align-items-center p-5 "
    >
      <div className="mb-4">
        The account{" "}
        <span>
          <b>{props.email}</b>
        </span>{" "}
        has been verified!{" "}
      </div>
      <Button
        size="lg"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
}

function VerifyCard(props: {
  email: string;
  setEmailVerified: (b: boolean) => void;
}) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState<string[]>([]);

  return (
    <>
      {
        <div
          style={{
            borderRadius: "0.5em",
            color: "black",
            marginBottom: "100px",
            border: "1px solid lightgray",
          }}
          className="d-flex flex-column align-items-center p-5 "
        >
          <div className="mb-4">
            We sent a six-digit verification code to{" "}
            <span>
              <b>{props.email}</b>.
            </span>{" "}
            Enter the code here!
          </div>
          <ReactCodeInput
            values={code}
            onChange={(e) => {
              setCode(Array.from(e));
              console.log(Array.from(e));
            }}
          />
          <div className="mt-3" style={{ color: "red" }}>
            {error}
          </div>
          <Button
            size="lg"
            disabled={code?.length < 6}
            onClick={async () => {
              console.log("Sending ", props.email, code.join(""));
              try {
                await Auth.confirmSignUp(props.email, code.join(""));
                props.setEmailVerified(true);
              } catch (error) {
                setError("Incorrect code");
              }
            }}
          >
            Submit
          </Button>
          <div
            className="my-3"
            onClick={async () => {
              await Auth.resendSignUp(props.email);
            }}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Resend email
          </div>
          {sendingEmail && (
            <Spinner className="my-3" animation="border"></Spinner>
          )}
        </div>
      }
    </>
  );
}
