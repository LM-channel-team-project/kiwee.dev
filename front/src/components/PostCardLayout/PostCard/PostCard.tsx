import IconButton from '@/components/Common/Button/Icon';
import { CardContainer, CardContent, CardContentWrap, CardImage, CardInfoWrap } from './styles';
import { IArticle } from '@/types/article';
import dayjs from 'dayjs';
import { memo } from 'react';
import { useNewTabContext } from '@/hooks/useNewTabContext';

interface PropTypes {
  data: IArticle;
}

function PostCard({ data }: PropTypes) {
  const [isNewTab] = useNewTabContext();

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
              <IconButton to="/like" iconName="like" size="small" styleType="default" />
            </li>
            <li>
              <IconButton to="/bookmark" iconName="bookmark" size="small" styleType="default" />
            </li>
          </ul>
        </div>
      </CardInfoWrap>
    </CardContainer>
  );
}

export default memo(PostCard);
