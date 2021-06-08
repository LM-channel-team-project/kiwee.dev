import { ComponentProps } from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

function SkeletonPostCard(props: ComponentProps<typeof ContentLoader>) {
  const theme = useTheme();
  return (
    <ContentLoader
      speed={2}
      backgroundColor={theme['btn-hover-bg-1']}
      foregroundColor={theme['btn-hover-bg-2']}
      uniqueKey="skeleton-post-card"
      css={`
        width: 320px;
        height: 361px;
        margin: 1.6rem;
        @media (max-width: 1056px) {
          width: calc(50% - 3.2rem);
          height: 449px;
        }

        @media (max-width: 767px) {
          width: 100%;
          height: 568px;
        }
      `}
      {...props}
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="44.3%" />
      <rect x="0" y="50%" rx="8" ry="8" width="40%" height="3.3%" />
      <rect x="0" y="57%" rx="8" ry="8" width="90%" height="11%" />
      <rect x="0" y="78%" rx="8" ry="8" width="100%" height="0.5%" />
      <rect x="0" y="87%" rx="8" ry="8" width="100%" height="8%" />
    </ContentLoader>
  );
}

export default SkeletonPostCard;
