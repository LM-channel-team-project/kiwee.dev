import { useCallback, useState } from 'react';
import { Session } from 'next-auth';
import { nextAuthWrapper } from '@/lib/nextAuthWrapper';

import ProfileStats from '@/components/Profile/ProfileStats';
import ProfileUser from '@/components/Profile/ProfileUser';
import ProfileStatsPostCardList from '@/components/Profile/ProfileStatsPostCardList';
import SkeletonProfileUser from '@/components/Skeleton/Profile/SkeletonProfileUser';
import AsyncBoundary from '@/components/AsyncBoundary';

function ErrorFallback({ error, reset }: { error: { message: string }; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

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
        rejectedFallback={({ error, reset }) => <ErrorFallback error={error} reset={reset} />}
        pendingFallback={<SkeletonProfileUser />}
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
