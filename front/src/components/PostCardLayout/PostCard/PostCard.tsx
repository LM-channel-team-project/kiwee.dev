import IconButton from '@/components/Common/Button/Icon';
import { CardContainer, CardContent, CardContentWrap, CardImage, CardInfoWrap } from './styles';
import { IArticle } from '@/types/article';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { useNewTabContext } from '@/hooks/useNewTabContext';
import { client } from '@/lib/api/client';
import { useSession } from 'next-auth/client';
import { DefaultTheme } from 'styled-components';

interface PropTypes {
  data: IArticle;
}

function PostCard({ data }: PropTypes) {
  const [isNewTab] = useNewTabContext();
  const [session] = useSession();
  const [canLike, setCanLike] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(data.isBookmarked);
  const providerId: string | unknown = session?.sub;

  // 처음 렌더링될 때 현재 접속자가 article에 좋아요를 눌렀는지 확인
  // useEffect(() => {
  //   const likeUsers = data.likes;
  //   if (likeUsers.length === 0) {
  //     setCanLike(true);
  //   } else {
  //     for (const id of likeUsers) {
  //       if (id.providerId === providerId) {
  //         setCanLike(false);
  //       } else {
  //         setCanLike(true);
  //       }
  //     }
  //   }
  // }, [providerId]);

  console.log(data);

  // 좋아요 요청
  const requestLikes = async (bool: boolean) => {
    try {
      const response = await client.post('/likes', {
        articleId: data.articleId,
        isLike: bool,
      });
      console.log('좋아요 요청 성공', response);
    } catch (err) {
      console.log('좋아요 실패', err);
    }
  };

  // 좋아요 버튼 클릭 시 호출
  const toggleLike = () => {
    const likeUsers = data.likes;

    // 아무도 좋아요를 누르지 않은 게시글인 경우
    if (likeUsers.length === 0) {
      requestLikes(canLike);
      setCanLike(!canLike);
    } else {
      for (const id of likeUsers) {
        // likeUsers에 현재 접속중인 사용자의 id가 있는 경우 (이미 누른 경우)
        if (id.providerId === providerId) {
          requestLikes(canLike);
          setCanLike(!canLike);
        } else {
          requestLikes(canLike);
          setCanLike(!canLike);
        }
      }
    }
  };

  // 북마크 요청
  const requestBookmark = async (bool: boolean) => {
    try {
      const response = await client.post('/bookmarks', {
        articleId: data.articleId,
        isSave: bool,
      });
      console.log('북마크 성공', response);
    } catch (err) {
      console.log('북마크 실패', err);
    }
  };

  // 북마크 버튼 클릭 시 호출
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    requestBookmark(!isBookmarked);
  };

  // 방문한 게시글 등록
  const onClickPost = async () => {
    if (!data.isVisited) {
      try {
        const response = await client.patch(`/history?articleId=${data.articleId}`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cardProps = {
    href: data.articleUrl,
    target: isNewTab ? '_blank' : '_self',
    rel: isNewTab ? 'noopener noreferrer' : '',
    onClick: onClickPost,
    thumbnail: data.provider.name,
  };

  // console.log(data);

  return (
    <CardContainer>
      <CardImage {...cardProps}>
        <div className="card-image"></div>
      </CardImage>
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
                onClick={toggleLike}
                css={`
                  &:hover {
                    svg {
                      color: ${canLike
                        ? ({ theme }: { theme: DefaultTheme }) => theme['like-icon-hover']
                        : ({ theme }: { theme: DefaultTheme }) => theme['like-icon-active-hover']};
                    }
                  }
                  svg {
                    color: ${canLike
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
                onClick={toggleBookmark}
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
