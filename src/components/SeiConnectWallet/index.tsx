import { Button, Box } from "@chakra-ui/react";
import { useWallet, useSelectWallet } from "@sei-js/react";

export type BalanceResponseType = {
  amount: string;
  denom: string;
};

function SeiConnectWallet() {
  const shortenAddress = (address: string) => {
    const startChars = address.substring(0, 6);
    const endChars = address.substring(address.length - 6);
    return `${startChars}...${endChars}`;
  };

  const { connectedWallet, accounts } = useWallet();
  const { openModal, closeModal } = useSelectWallet();

  return (
    <Box>
      {!connectedWallet ? (
        <Button onClick={openModal} mt={4} colorScheme="teal" type="button">
          Connect Wallet
        </Button>
      ) : (
        <p>Account Address: {shortenAddress(accounts[0].address)}</p>
      )}
    </Box>
  );
}

export default SeiConnectWallet;
