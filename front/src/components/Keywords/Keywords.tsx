import { Container, KeywordItem } from './styles';

interface PropTypes {
  keywords: {
    [key: string]: number;
  };
}

function Keywords({ keywords }: PropTypes) {
  return (
    <Container>
      {Array.from(keywords).map(([key, value]) => (
        <KeywordItem key={key}>
          {key} ({value})
        </KeywordItem>
      ))}
    </Container>
  );
}

export default Keywords;
