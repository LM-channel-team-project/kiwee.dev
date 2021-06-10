import { useEffect } from 'react';
import styled from 'styled-components';

import {
  useMutationObserverSetTarget,
  useMutationObserverTarget,
} from '@/context/MutationObserverContext';
import useGetArticlesInfos from '@/hooks/swr/useGetArticleInfos';
import ProfileStatsItem from './ProfileStatsItem';

interface ProfileStatsProps {
  selected: 'histories' | 'likes';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ProfileStats({ selected, onClick }: ProfileStatsProps) {
  const { infos: histories, refresh: historeisRefresh } = useGetArticlesInfos('histories');
  const { infos: likes, refresh: likesRefresh } = useGetArticlesInfos('likes');

  const target = useMutationObserverTarget();
  const setTarget = useMutationObserverSetTarget();

  useEffect(() => {
    if (target?.filter === 'likes') likesRefresh();
    if (target?.filter === 'histories') historeisRefresh();
    setTarget(null);
  }, [target]);

  return (
    <ProfileStatsBlock>
      <h2>Stats</h2>
      <div className="profile-stats-items">
        <ProfileStatsItem
          label="읽은 글"
          name="histories"
          onClick={onClick}
          selected={selected === 'histories'}
          count={histories?.length}
        />
        <ProfileStatsItem
          label="좋아요한 글"
          name="likes"
          onClick={onClick}
          selected={selected === 'likes'}
          count={likes?.length}
        />
      </div>
    </ProfileStatsBlock>
  );
}

const ProfileStatsBlock = styled.section`
  display: flex;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    display: block;
    width: 100%;
    margin: 3.2rem 0 2.4rem 0;
    font-size: 2rem;
    font-weight: 700;
  }
  .profile-stats-items {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export default ProfileStats;
