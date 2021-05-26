import { ComponentProps } from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

function SkeletonProfileUser(props: ComponentProps<typeof ContentLoader>) {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={2}
      width={360}
      height={314}
      viewBox="0 0 360 314"
      backgroundColor={theme['btn-hover-bg-1']}
      foregroundColor={theme['btn-hover-bg-2']}
      style={{ width: '100%' }}
      uniqueKey="skeleton-profile-user"
      {...props}
    >
      <rect x="150" y="47" rx="8" ry="8" width="182" height="28" />
      <rect x="0" y="0" rx="8" ry="8" width="122" height="122" />
      <rect x="0" y="158" rx="8" ry="8" width="360" height="56" />
    </ContentLoader>
  );
}

export default SkeletonProfileUser;
