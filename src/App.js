import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import TopBar from './components/TopBar';

const App = () => {
  const check = 'string';
  console.log(check);

  return (
    <>
      <TopBar />
      <Container>
        <p>This is a sample text</p>
      </Container>
    </>
  );
};

export default App;
