import { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

import ProfileStats from '@/components/Profile/ProfileStats';
import ProfileUser from '@/components/Profile/ProfileUser';
import ProfileStatsPostCardList from '@/components/Profile/ProfileStatsPostCardList';
import { getSession } from 'next-auth/client';

type SelectedType = 'visit' | 'like';

function profile({ session }: { session: Session }) {
  if (!session.user) return null;

  const { user } = session;
  const [selected, setSelected] = useState<SelectedType>('visit');

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.name as SelectedType);
  }, []);

  return (
    <>
      <ProfileUser user={user} />
      <ProfileStats user={user} selected={selected} onClick={onClick} />
      <ProfileStatsPostCardList user={user} selected={selected} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default profile;
