import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import styled from 'styled-components';
import TextButton from '@/components/Common/Button/Text';

function HeaderAuth({
  session,
  toggleModal,
}: {
  session: Session | null;
  toggleModal: () => void;
}) {
  return (
    <HeaderAuthBlock>
      {!session ? (
        <TextButton label="Login" styleType="primary" size="large" onClick={toggleModal} />
      ) : (
        <Link href="/profile">
          <a>
            <Image
              loader={imageLoader}
              src={session.user?.image || 'null'}
              width="40"
              height="40"
              alt="profile image"
              layout="intrinsic"
              className="profile-image"
            />
          </a>
        </Link>
      )}
    </HeaderAuthBlock>
  );
}

function imageLoader({ src }: { src: string }) {
  return src;
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 8px;
  }
`;

export default HeaderAuth;
