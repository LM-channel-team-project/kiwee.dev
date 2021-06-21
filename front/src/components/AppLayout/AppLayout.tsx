import styled from 'styled-components';
import Header from '@/components/Header';
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
  min-height: calc(100vh - 120px);
  flex-direction: column;
  align-items: center;
`;

export default AppLayout;
