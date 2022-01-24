import { User } from "firebase/auth";
import type { GetServerSideProps } from "next";
import React from "react";
import { getUser } from "~/utils/firebase.server";
import { parseCookies } from "nookies";
import { Button } from "@mui/material";
import nookies from "nookies";

interface UserTestI {
  user?: User;
  error?: any;
  cookies?: any;
  foo: string;
}
const GetUserTest: React.FC<UserTestI> = (props) => {
  const getCookies = () => {
    const cookies = parseCookies();
    console.log({ cookies });
  };
  return (
    <div>
      {props.user ? (
        <pre style={{ fontSize: 12 }}>{JSON.stringify(props, null, 2)}</pre>
      ) : (
        <pre style={{ fontSize: 12 }}>{props.error}</pre>
      )}
      <h3>cookies:</h3>
      <pre style={{ fontSize: 12 }}>
        {JSON.stringify(props.cookies, null, 2)}
      </pre>
      <Button onClick={getCookies}>get cookies</Button>
    </div>
  );
};

export default GetUserTest;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const foo = "bar";
    return {
      props: { foo },
    };
  } catch (error) {
    return {
      props: { error: JSON.stringify(error, null, 2) },
    };
  }
};
