import { ChakraProvider } from '@chakra-ui/react';
// import Home from './pages/Home';
import { extendTheme } from '@chakra-ui/react';
import styled from "styled-components";
import InteractPage from './pages/InteractPage';

export const Wrapper = styled.div`
    display: flex;
`;

const theme = extendTheme({
  components: {
    Step: {
      baseStyle: {
        backgroundColor: 'teal.200',
        color: 'white',
      },
    },
    StepTitle: {
      baseStyle: {
        fontSize: '16px',
        color: 'black',
      },
    },
  },
});


function App() {

  return (
    <>
      <ChakraProvider theme={theme}>
        <Wrapper>
          <InteractPage/>
        </Wrapper>
      </ChakraProvider>
    </>
  );
}

export default App;
