import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import useGetMe from '@/hooks/swr/useGetMe';

function ProfileUser() {
  const { provider } = useGetMe({ suspense: true });
  if (!provider) return null;
  return (
    <ProfileUserBlock>
      <div className="profile-wrapper">
        <div className="profile-image-wrapper">
          <Image
            loader={imageLoader}
            src={provider.avatar || 'null'}
            width="122"
            height="122"
            alt="profile image"
            layout="fixed"
            className="profile-image"
          />
        </div>
        <h1 className="profile-name">{provider.name}</h1>
      </div>
    </ProfileUserBlock>
  );
}

const ProfileUserBlock = styled.section`
  display: flex;
  width: 100%;
  margin-top: 1.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profile-wrapper {
    display: flex;
    width: 100%;
    min-width: 320px;
    max-width: 360px;
    justify-content: space-between;
    align-items: center;

    .profile-image {
      border-radius: 0.8rem;
    }
    .profile-name {
      display: flex;
      flex-basis: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 2.8rem;
      font-weight: 600;
    }
  }
  .profile-auth-btn {
    max-width: 360px;
    margin-top: 3.6rem;
    height: 56px;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 96px;
    border-bottom: 1px solid ${(props) => props.theme['header-line']};
  }
`;

function imageLoader({ src }: { src: string }) {
  return src;
}

export default React.memo(ProfileUser);
