import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getSession } from 'next-auth/client';

type NextAuthWrapper<
  P extends { [key: string]: any } = {
    [key: string]: any;
  },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  redirect?: { redirectToHome: boolean },
  cb?: (ctx: GetServerSidePropsContext<Q>) => Promise<{ props: P }>,
) => GetServerSideProps<P, Q>;

export const nextAuthWrapper: NextAuthWrapper = (
  { redirectToHome } = { redirectToHome: false },
  cb,
) => {
  return async (ctx) => {
    const session = await getSession({ req: ctx.req });
    console.log(session);
    // 세션에 유저 정보가 없고 redirectToHome 참일 경우 메인페이지로 리다이렉트
    if (!session?.user && redirectToHome) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
    if (!cb) {
      return {
        props: {
          session,
        },
      };
    }
    const { props } = await cb(ctx);
    return {
      props: {
        session,
        ...props,
      },
    };
  };
};
