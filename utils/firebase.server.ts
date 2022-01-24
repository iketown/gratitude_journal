import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";
import nookies from "nookies";
import admin from "firebase-admin";
import {
  applicationDefault,
  cert,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";

if (!admin.apps.length) {
  const googleAppCredString = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
  const credential = JSON.parse(
    Buffer.from(googleAppCredString, "base64").toString()
  );
  initializeAdminApp({
    credential: cert(credential),
    databaseURL: "https://sparks-33f0a.firebaseio.com",
  });
}
// export const adminDB = admin.firestore();
export const adminAuth = admin.auth();
export const adminDB = admin.firestore();

export const getUser = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    const { token } = nookies.get(ctx);
    if (!token) return null;
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
