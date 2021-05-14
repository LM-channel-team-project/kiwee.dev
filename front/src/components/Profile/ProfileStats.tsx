import ProfileStatsItem from './ProfileStatsItem';
import styled from 'styled-components';
import React from 'react';

interface ProfileStatsProps {
  selected: 'visit' | 'like';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ProfileStats({ selected, onClick }: ProfileStatsProps) {
  return (
    <ProfileStatsBlock>
      <h2>Stats</h2>
      <div className="profile-stats-items">
        <ProfileStatsItem
          label="읽은 글"
          name="visit"
          onClick={onClick}
          selected={selected === 'visit'}
        />
        <ProfileStatsItem
          label="좋아요한 글"
          name="like"
          onClick={onClick}
          selected={selected === 'like'}
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
