import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";
import nookies from "nookies";
import admin from "firebase-admin";
import {
  applicationDefault,
  cert,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
//
if (!admin.apps.length) {
  const firebase_service_account_key = process.env.FB_SAK!;
  const serviceAccount = JSON.parse(firebase_service_account_key);

  initializeAdminApp({
    credential: cert(serviceAccount),
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
