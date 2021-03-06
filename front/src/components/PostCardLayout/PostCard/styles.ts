import styled, { css } from 'styled-components';
import IconButton from '@/components/Common/Button/Icon';

type CardIconButtonType = {
  actived: boolean;
  iconName: 'like' | 'bookmark';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CardContainer = styled.article`
  width: 32rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme['article-bg']};
  margin: 1.6rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  @media (max-width: 1056px) {
    width: calc(50% - 3.2rem);
  }

  @media (max-width: 767px) {
    width: 100%;
  }

  :hover {
    transform: translateY(-0.8rem);
    box-shadow: 0px 6px 6px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const CardImage = styled.a<{ thumbnail: string }>`
  display: block;
  color: inherit;
  width: 100%;
  position: relative;
  padding-top: 50%;
  text-decoration: none;
  background: url('/img/${(props) => props.thumbnail}.jpeg') no-repeat center;
  background-size: contain;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme['article-division']};
`;

export const CardContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  div.sub-info {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme['font-inactive']};

    span.seperator {
      margin: 0 0.4rem;
    }
  }
`;

export const CardContent = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  h3 {
    font-size: 2.4rem;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.2;
    height: 8.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CardInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  border-top: 1px solid ${({ theme }) => theme['article-division']};
  font-size: 1.4rem;
  .card-info-left {
    display: flex;
    align-items: center;
    img.post-info-image {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      margin-right: 0.4rem;
    }
  }
`;

export const CardIconButton = styled(IconButton)<CardIconButtonType>`
  ${({ iconName, actived }) => setIconStyle(iconName, actived)}
`;

const setIconStyle = (iconName: 'like' | 'bookmark', actived: boolean) => {
  const hoverColor = `${iconName}-icon-hover` as const;
  const activeColor = `${iconName}-icon-active` as const;
  const activeHoverColor = `${iconName}-icon-active-hover` as const;
  return css`
    svg {
      color: ${actived ? ({ theme }) => theme[activeColor] : ''};
    }
    &:hover {
      svg {
        color: ${actived
          ? ({ theme }) => theme[activeHoverColor]
          : ({ theme }) => theme[hoverColor]};
      }
    }
  `;
};
