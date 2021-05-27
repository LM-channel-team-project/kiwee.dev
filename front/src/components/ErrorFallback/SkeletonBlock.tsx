import ContentLoader from 'react-content-loader';
import styled, { useTheme } from 'styled-components';

interface SkeletonBlock {
  children: React.ReactNode;
  width: number;
  height: number;
}

function SkeletonBlock({ children, width, height }: SkeletonBlock) {
  const theme = useTheme();

  return (
    <Block>
      <div className="error-block">{children}</div>
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor={theme['btn-hover-bg-1']}
        foregroundColor={theme['btn-hover-bg-2']}
        uniqueKey="profile-user-error-fallback"
      >
        <rect x="0" y="0" rx="16" ry="16" width={width} height={height} />
      </ContentLoader>
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-block {
    position: absolute;
    z-index: 200;
  }
  svg {
    z-index: 100;
    width: 100%;
    height: 100%;
  }
`;

export default SkeletonBlock;
