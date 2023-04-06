'use client'

import React from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";

function Profile() {
  const { user } = useAuth0();
  if (!user) throw new Error("no user");
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          {/* <img
            src={user.picture || "/profile_image.png"}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            referrerPolicy="no-referrer"
          /> */}
          <Image src={user.picture || "/profile_image.png"} alt="Profile" width={200} height={200} className="rounded-circle img-fluid profile-picture mb-3 mb-md-0" referrerPolicy="no-referrer" />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
