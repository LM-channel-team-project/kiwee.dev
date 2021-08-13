import React, { memo, useCallback, useState, useMemo } from 'react';
import dayjs from 'dayjs';

import { IArticle } from '@/types/article';
import { FilterType } from '@/types/apiType';
import { updateArticleInfo } from '@/lib/api/article';
import { useNewTabContext } from '@/hooks/useNewTabContext';
import useGetMe from '@/hooks/swr/useGetMe';
import debounce from '@/lib/utils/debounce';

import {
  CardContainer,
  CardContent,
  CardContentWrap,
  CardImage,
  CardInfoWrap,
  CardIconButton,
} from './styles';

interface PropTypes {
  article: IArticle;
}

interface CardImageType extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  thumbnail: string;
  'data-update-target': FilterType;
  'data-actived': boolean;
}

function PostCard({ article }: PropTypes) {
  const { title, articleId, articleUrl, provider, ...info } = article;
  const [isNewTab] = useNewTabContext();
  const { provider: me } = useGetMe();
  const [isActived, setIsActived] = useState({
    likes: info.isLiked,
    bookmarks: info.isBookmarked,
    histories: info.isVisited,
  });

  const onUpdate = useCallback(async (updateTarget: FilterType, isActived: boolean) => {
    if (updateTarget === 'histories' && isActived) return;
    const result = await updateArticleInfo(updateTarget, articleId, !isActived);
    if (result) {
      setIsActived((prev) => ({ ...prev, [updateTarget]: !isActived }));
    }
  }, []);

  const debounceOnUpdate = useCallback(debounce(onUpdate, 500), []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const { updateTarget, actived } = e.currentTarget.dataset as {
        updateTarget: FilterType;
        actived: string;
      };
      if (!me) return updateTarget === 'histories' ? null : alert('로그인이 필요합니다.');
      const isActived = actived === 'true' || false;
      setIsActived((prev) => ({ ...prev, [updateTarget]: !isActived }));
      debounceOnUpdate(updateTarget, isActived);
    },
    [me],
  );

  const cardProps = useMemo(
    () => getCardProps(articleUrl, provider.name, info.isVisited, isNewTab, title),
    [article, isNewTab],
  );

  return (
    <CardContainer>
      <CardImage onClick={onClick} {...cardProps} />
      <CardContentWrap>
        <div className="sub-info">{dayjs(info.insertDate).format('MMM DD, YYYY')}</div>
        <CardContent {...cardProps}>
          <h3>{title}</h3>
        </CardContent>
      </CardContentWrap>
      <CardInfoWrap>
        <div className="card-info-left">
          <img className="post-info-image" src={provider.avatar} alt={provider.name} />
          {provider.name}
        </div>
        <div className="card-info-right">
          <ul className="buttons">
            <li>
              <CardIconButton
                aria-label="like-button"
                iconName="like"
                size="small"
                styleType={'default'}
                onClick={onClick}
                actived={isActived.likes}
                data-update-target="likes"
                data-actived={isActived.likes}
              />
            </li>
            <li>
              <CardIconButton
                aria-label="bookmark-button"
                iconName="bookmark"
                size="small"
                styleType="default"
                onClick={onClick}
                actived={isActived.bookmarks}
                data-update-target="bookmarks"
                data-actived={isActived.bookmarks}
              />
            </li>
          </ul>
        </div>
      </CardInfoWrap>
    </CardContainer>
  );
}

const getCardProps = (
  href: string,
  thumbnail: string,
  isVisited: boolean,
  isNewTab: boolean,
  ariaLabel: string,
): CardImageType => ({
  href,
  thumbnail,
  target: isNewTab ? '_blank' : '_self',
  rel: isNewTab ? 'noopener noreferrer' : '',
  ['data-update-target']: 'histories',
  ['data-actived']: isVisited,
  'aria-label': ariaLabel,
});

export default memo(PostCard);
