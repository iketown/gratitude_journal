import type { GetServerSideProps } from "next";
import { WeekPage } from "~/page_components/weekpage/WeekPage";
import { getUser } from "~/utils/firebase.server";
import { getUserTagSet, getWeekPosts } from "~/utils/firebaseFxns";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUser(ctx);
  if (!user?.uid)
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  const user_id = user.uid;
  const { posts, startDate, endDate, dates } = await getWeekPosts({
    ctx,
    user,
  });
  const myTagSet = await getUserTagSet(user_id);
  return {
    props: {
      user,
      posts,
      startDate,
      endDate,
      dates,
      myTagSet,
    },
  };
};

export default WeekPage;
