import { User } from "firebase/auth";
import type { GetServerSideProps } from "next";
import React from "react";
import { getUser } from "~/utils/firebase.server";

interface UserTestI {
  user?: User;
  error?: any;
}
const GetUserTest: React.FC<UserTestI> = (props) => {
  return (
    <div>
      this should get the user if there is one
      {props.user ? (
        <pre style={{ fontSize: 12 }}>{JSON.stringify(props, null, 2)}</pre>
      ) : (
        <pre style={{ fontSize: 12 }}>{props.error}</pre>
      )}
    </div>
  );
};

export default GetUserTest;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await getUser(ctx);
    return {
      props: { user },
    };
  } catch (error) {
    return {
      props: { error: JSON.stringify(error, null, 2) },
    };
  }
};
