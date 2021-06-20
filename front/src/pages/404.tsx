import TextButton from '@/components/Common/Button/Text';
import styled from 'styled-components';

function NotFound() {
  return (
    <SectionBlock>
      <h1>404</h1>
      <p>이런! 찾으시는 페이지가 없네요 :(</p>
      <TextButton label="홈으로 돌아가기" styleType="border" size="large" to="/" passHref />
    </SectionBlock>
  );
}

const SectionBlock = styled.section`
  display: flex;
  width: 100%;
  height: 70vh;
  padding: 40px;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme['font-inactive']};
  h1 {
    font-size: 6.4rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 80px;
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 4rem;
    font-size: 1.6rem;
  }
`;

export default NotFound;
