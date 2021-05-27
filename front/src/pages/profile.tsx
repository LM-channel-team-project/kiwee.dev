import { useCallback, useState } from 'react';
import { Session } from 'next-auth';
import { nextAuthWrapper } from '@/lib/nextAuthWrapper';

import ProfileStats from '@/components/Profile/ProfileStats';
import ProfileUser from '@/components/Profile/ProfileUser';
import ProfileStatsPostCardList from '@/components/Profile/ProfileStatsPostCardList';
import AsyncBoundary from '@/components/AsyncBoundary';
import SkeletonProfileUser from '@/components/Skeleton/Profile/SkeletonProfileUser';
import ProfileUserFallback from '@/components/ErrorFallback/Profile/ProfileUserFallback';

import { GET_ME_KEY } from '@/hooks/swr/useGetMe';
import { useDeleteErrorCache } from '@/hooks/swr/useDeleteErrorCache';

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
      <AsyncBoundary
        rejectedFallback={({ error, reset }) => <ProfileUserFallback error={error} reset={reset} />}
        pendingFallback={<SkeletonProfileUser />}
        onReset={() => {
          useDeleteErrorCache(GET_ME_KEY);
        }}
      >
        <ProfileUser />
      </AsyncBoundary>
      <ProfileStats user={user} selected={selected} onClick={onClick} />
      <ProfileStatsPostCardList user={user} selected={selected} />
    </>
  );
}

export const getServerSideProps = nextAuthWrapper({ redirectToHome: true });

export default profile;
