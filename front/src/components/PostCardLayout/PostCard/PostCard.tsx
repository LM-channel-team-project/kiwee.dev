import IconButton from '@/components/Common/Button/Icon';
import { CardContainer, CardContent, CardContentWrap, CardImage, CardInfoWrap } from './styles';
import { IArticle } from '@/types/article';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { useNewTabContext } from '@/hooks/useNewTabContext';
import { client } from '@/lib/api/client';
import { useSession } from 'next-auth/client';

interface PropTypes {
  data: IArticle;
}

function PostCard({ data }: PropTypes) {
  const [isNewTab] = useNewTabContext();
  const [session] = useSession();
  const [likes, setLikes] = useState(false);
  const providerId: string | unknown = session?.sub;

  // 처음 렌더링될 때 현재 접속자가 article에 좋아요를 눌렀는지 확인
  useEffect(() => {
    const likeUsers = data.likes;
    if (likeUsers.length === 0) {
      setLikes(true);
    } else {
      for (const id of likeUsers) {
        if (id.providerId === providerId) {
          setLikes(false);
        } else {
          setLikes(true);
        }
      }
    }
  }, []);

  const postLikes = async (bool: boolean) => {
    try {
      const response = await client.post('/api/likes', {
        articleId: data.articleId,
        isLike: bool,
      });
      console.log('좋아요 성공', response);
    } catch (err) {
      console.log('좋아요 실패', err);
    }
  };

  const toggleLike = () => {
    const likeUsers = data.likes;

    if (likeUsers.length === 0) {
      postLikes(likes);
      setLikes(!likes);
    } else {
      for (const id of likeUsers) {
        if (id.providerId === providerId) {
          postLikes(likes);
          setLikes(!likes);
        } else {
          postLikes(likes);
          setLikes(!likes);
        }
      }
    }
  };

  return (
    <CardContainer>
      <CardImage
        href={data.articleUrl}
        target={isNewTab ? '_blank' : '_self'}
        rel={isNewTab ? 'noopener noreferrer' : 'prev'}
      >
        <div className="card-image">
          <img
            src="https://media.vlpt.us/images/jjunyjjuny/post/e7f0d557-1fab-4a61-ae8e-b5cb1a911b09/ek7ji4zrimozpp2yzk0a.png?w=640"
            alt=""
          />
        </div>
      </CardImage>
      <CardContentWrap>
        <div className="sub-info">{dayjs(data.insertDate).format('MMM DD, YYYY')}</div>
        <CardContent href={data.articleUrl}>
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
                styleType={likes ? 'primary' : 'default'}
                onClick={toggleLike}
              />
            </li>
            <li>
              <IconButton iconName="bookmark" size="small" styleType="default" />
            </li>
          </ul>
        </div>
      </CardInfoWrap>
    </CardContainer>
  );
}

export default memo(PostCard);
