import { Container, KeywordItem } from './styles';

interface PropTypes {
  keywords: {
    [key: string]: number;
  };
  handleFiltering: (key: string) => void;
}

function Keywords({ keywords, handleFiltering }: PropTypes) {
  return (
    <Container>
      <KeywordItem onClick={() => handleFiltering('All')}>전체</KeywordItem>
      {Array.from(keywords).map(([key, value]) => (
        <KeywordItem key={key} onClick={() => handleFiltering(key)}>
          {key} ({value})
        </KeywordItem>
      ))}
    </Container>
  );
}

export default Keywords;
