import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getSession } from 'next-auth/client';

type NextAuthWrapper = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  redirect?: { redirectToHome: boolean },
  callback?: (ctx: GetServerSidePropsContext<Q | ParsedUrlQuery>) => Promise<{ props: P }>,
) => GetServerSideProps;

export const nextAuthWrapper: NextAuthWrapper = (
  { redirectToHome } = { redirectToHome: false },
  callback,
) => {
  return async (ctx) => {
    const session = await getSession({ req: ctx.req });
    if (!session?.user && redirectToHome) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
    if (!callback) {
      return {
        props: {
          session,
        },
      };
    }
    const { props } = await callback(ctx);
    return {
      props: {
        session,
        ...props,
      },
    };
  };
};
