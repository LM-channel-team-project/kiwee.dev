import styled from 'styled-components';
import SkeletonBlock from '../SkeletonBlock';
import TextButton from '@/components/Common/Button/Text';

function ProfileUserFallback({ error, reset }: { error: { message: string }; reset: () => void }) {
  return (
    <SkeletonBlock width={360} height={314}>
      <Block role="alert">
        <p className="error-message">오류가 발생했어요 :(</p>
        <TextButton
          className="retry-button"
          label="새로고침"
          styleType="border"
          onClick={() => {
            reset();
          }}
        />
      </Block>
    </SkeletonBlock>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .error-message {
    font-size: 1.8rem;
    color: ${({ theme }) => theme['font-inactive']};
    margin-bottom: 1.6rem;
  }
`;

export default ProfileUserFallback;
