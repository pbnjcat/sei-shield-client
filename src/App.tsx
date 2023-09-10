import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import styled from "styled-components";
import InteractPage from "./pages/InteractPage";
import { SeiWalletProvider } from "@sei-js/react";

export const Wrapper = styled.div`
  display: flex;
`;

const theme = extendTheme({
  components: {
    Step: {
      baseStyle: {
        backgroundColor: "teal.200",
        color: "white",
      },
    },
    StepTitle: {
      baseStyle: {
        fontSize: "16px",
        color: "black",
      },
    },
  },
});

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Wrapper>
          <SeiWalletProvider
            chainConfiguration={{
              chainId: "atlantic-2",
              restUrl: "https://rest.atlantic-2.seinetwork.io",
              rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
            }}
            wallets={["compass", "fin"]}
          >
            <InteractPage />
          </SeiWalletProvider>
        </Wrapper>
      </ChakraProvider>
    </>
  );
}

export default App;
