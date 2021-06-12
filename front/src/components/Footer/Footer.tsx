import styled from 'styled-components';

function Footer() {
  return (
    <FooterBlock>
      <ul>
        <li>
          &#169; 2021 LOGONAME.
        </li>
      </ul>
    </FooterBlock>
  );
}

const FooterBlock = styled.footer`
  margin: 40px;
  font-size: 1.4rem;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Footer;
