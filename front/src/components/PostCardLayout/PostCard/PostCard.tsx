import IconButton from '@/components/Common/Button/Icon';
import { CardContainer, CardContent, CardContentWrap, CardImage, CardInfoWrap } from './styles';
import { IArticle } from '@/types/article';
import dayjs from 'dayjs';
import { memo, useState } from 'react';
import { useNewTabContext } from '@/hooks/useNewTabContext';
import { useSession } from 'next-auth/client';
import { DefaultTheme } from 'styled-components';
import useUpdateArticleInfo from '@/hooks/useUpdateArticleInfo';

interface PropTypes {
  data: IArticle;
}

function PostCard({ data }: PropTypes) {
  const [isNewTab] = useNewTabContext();
  const [session] = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(data.isLiked);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(data.isBookmarked);
  const providerId: string | unknown = session?.sub;
  const { onUpdate } = useUpdateArticleInfo();

  const onClickLike = async () => {
    if (!providerId) alert('로그인이 필요합니다.');
    const result = await onUpdate('likes', data.articleId, !isLiked);
    // console.log(result);
    result && setIsLiked(!isLiked);
  };

  const onClickPost = async () => {
    if (!providerId) return;
    await onUpdate('histories', data.articleId, true);
  };

  const onClickBookmark = async () => {
    if (!providerId) alert('로그인이 필요합니다.');
    const result = await onUpdate('bookmarks', data.articleId, !isBookmarked);
    // console.log(result);
    result && setIsBookmarked(!isBookmarked);
  };

  const cardProps = {
    href: data.articleUrl,
    target: isNewTab ? '_blank' : '_self',
    rel: isNewTab ? 'noopener noreferrer' : '',
    onClick: onClickPost,
    thumbnail: data.provider.name,
  };

  return (
    <CardContainer>
      <CardImage {...cardProps} />
      <CardContentWrap>
        <div className="sub-info">{dayjs(data.insertDate).format('MMM DD, YYYY')}</div>
        <CardContent {...cardProps}>
          <h3>{data.title}</h3>
        </CardContent>
      </CardContentWrap>
      <CardInfoWrap>
        <div className="card-info-left">
          <img className="post-info-image" src={data.provider.avatar} alt={data.provider.name} />
          {data.provider.name}
        </div>
        <div className="card-info-right">
          <ul className="buttons">
            <li>
              <IconButton
                iconName="like"
                size="small"
                styleType={'default'}
                onClick={onClickLike}
                css={`
                  &:hover {
                    svg {
                      color: ${!isLiked
                        ? ({ theme }: { theme: DefaultTheme }) => theme['like-icon-hover']
                        : ({ theme }: { theme: DefaultTheme }) => theme['like-icon-active-hover']};
                    }
                  }
                  svg {
                    color: ${!isLiked
                      ? ''
                      : ({ theme }: { theme: DefaultTheme }) => theme['like-icon-active']};
                  }
                `}
              />
            </li>
            <li>
              <IconButton
                iconName="bookmark"
                size="small"
                styleType="default"
                onClick={onClickBookmark}
                css={`
                  &:hover {
                    svg {
                      color: ${!isBookmarked
                        ? ({ theme }: { theme: DefaultTheme }) => theme['bookmark-icon-hover']
                        : ({ theme }: { theme: DefaultTheme }) =>
                            theme['bookmark-icon-active-hover']};
                    }
                  }
                  svg {
                    color: ${!isBookmarked
                      ? ''
                      : ({ theme }: { theme: DefaultTheme }) => theme['bookmark-icon-active']};
                  }
                `}
              />
            </li>
          </ul>
        </div>
      </CardInfoWrap>
    </CardContainer>
  );
}

export default memo(PostCard);
