import styled from 'styled-components';
function Footer() {
  return (
    <FooterBlock>
      <a href="https://github.com/LM-channel-team-project/team10">&#169;team10</a>
    </FooterBlock>
  );
}

const FooterBlock = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  a {
    color: ${({ theme }) => theme['font-inactive']};
    &:link,
    &:visited {
      text-decoration: none;
    }
    &:hover {
      color: ${({ theme }) => theme['font']};
      text-decoration: underline;
    }
  }
`;

export default Footer;
