import { useCallback, useState } from 'react';
import { Session } from 'next-auth';

import ProfileStats from '@/components/Profile/ProfileStats';
import ProfileUser from '@/components/Profile/ProfileUser';
import ProfileStatsPostCardList from '@/components/Profile/ProfileStatsPostCardList';
import { nextAuthWrapper } from '@/lib/nextAuthWrapper';

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
      <ProfileUser />
      <ProfileStats user={user} selected={selected} onClick={onClick} />
      <ProfileStatsPostCardList user={user} selected={selected} />
    </>
  );
}

export const getServerSideProps = nextAuthWrapper({ redirectToHome: true });

export default profile;
