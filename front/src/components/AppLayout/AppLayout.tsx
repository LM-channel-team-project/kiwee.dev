import styled from 'styled-components';
import Header from '@/components/header';
import Footer from '@/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <MainBlock>{children}</MainBlock>
      <Footer />
    </>
  );
}

const MainBlock = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AppLayout;
