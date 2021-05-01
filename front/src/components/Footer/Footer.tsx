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
  font-size: 0.75rem;
  a:link,
  a:visited {
    text-decoration: none;
    color: #999999;
  }
  a:hover {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: underline;
  }
`;

export default Footer;
