import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SeiWalletProvider } from '@sei-js/react';
import SeiConnectWallet from '../SeiConnectWallet';
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberInput,
  Button,
  FormLabel,
  FormControl,
  Flex,
  Checkbox,
  FormHelperText,
  Spinner,
  useToast,
} from '@chakra-ui/react';

type FormData = {
  depositAmount: number;
  userType: string;
  userAgreement: boolean;
  receivedItem?: boolean;
};

interface AgreementFormProps {
  activeStep: number;
  handleNext: () => void; // add step
  handleBack: () => void; // remove step
  isLastStep: () => boolean;
}

const AgreementForm: React.FC<AgreementFormProps> = ({
  activeStep,
  handleNext,
  handleBack,
  isLastStep,
}) => {
  const { handleSubmit, register } = useForm<FormData>();
  const [userType, setUserType] = useState<string>('Buyer');
  const [userAgreement, setUserAgreement] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receivedItem, setReceivedItem] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    depositAmount: 0,
    userType: 'Buyer',
    userAgreement: false,
    receivedItem: false,
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    console.log('Submitting', values);
    setIsSubmitting(true);
    setFormData(values);
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      toast({
        title: 'Form Submitted',
        description: 'Your form has been successfully submitted!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleNext();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: 'There was an error submitting the form.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepositAmountChange = (value: number) => {
    setFormData({ ...formData, depositAmount: value });
  };

  return (
    <Flex direction='column' align='center'>
      <FormLabel marginTop='10'>{userType} Page</FormLabel>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box height='140' marginTop='5'>
            <FormControl>
              {activeStep === 0 && (
                <Flex width='900px' direction='column' align='center'>
                  <SeiWalletProvider
                    chainConfiguration={{
                      chainId: 'atlantic-2',
                      restUrl: 'https://rest.atlantic-2.seinetwork.io',
                      rpcUrl: 'https://rpc.atlantic-2.seinetwork.io',
                    }}
                    wallets={['compass', 'fin']}>
                    <SeiConnectWallet />
                  </SeiWalletProvider>
                </Flex>
              )}
              {activeStep === 1 && (
                <RadioGroup
                  onChange={(value) => {
                    setUserType(value);
                    setFormData({ ...formData, userType: value });
                  }}
                  value={userType}
                  justifyContent='center'>
                  <FormLabel style={{ textAlign: 'center' }}>
                    I am a...
                  </FormLabel>
                  <Stack direction='row' align='center' justify='center'>
                    <Radio value='Buyer' {...register('userType')}>
                      Buyer
                    </Radio>
                    <Radio value='Seller' {...register('userType')}>
                      Seller
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
              {activeStep === 2 && (
                <Flex align='center' direction='column'>
                  <FormLabel fontWeight='bold' mb='2'>
                    Deposit Amount
                  </FormLabel>
                  <FormHelperText>
                    Make a deposit equal to exactly 1x the item price.
                  </FormHelperText>
                  <Flex>
                    <NumberInput
                      defaultValue={0}
                      min={0}
                      onChange={(valueString) =>
                        handleDepositAmountChange(parseFloat(valueString))
                      }>
                      <NumberInputField {...register('depositAmount')} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button type='button' colorScheme='blue' marginInline='1'>
                      Deposit
                    </Button>
                  </Flex>
                </Flex>
              )}
              {/* Render depending on buyer/seller */}
              {activeStep === 3 && (
                <FormControl>
                  <FormLabel style={{ textAlign: 'center' }}>
                    Confirm Transfer
                  </FormLabel>
                  {userType === 'Buyer' ? (
                    <RadioGroup
                      onChange={(value) => {
                        const isReceived = value === 'received';
                        setReceivedItem(isReceived);
                        setFormData({
                          ...formData,
                          receivedItem: isReceived,
                        });
                      }}
                      value={receivedItem ? 'received' : 'notReceived'}>
                      <Stack direction='row'>
                        <Radio value='received' {...register('receivedItem')}>
                          I received the correct item
                        </Radio>
                        <Radio value='notReceived' {...register('receivedItem')}>
                          I did not receive the correct item
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  ) : (
                    <Checkbox
                      isChecked={userAgreement}
                      {...register('userAgreement')}
                      onChange={(e) => {
                        setUserAgreement(e.target.checked);
                        setFormData({
                          ...formData,
                          userAgreement: e.target.checked,
                        });
                      }}>
                      I confirm that I have given the correct item
                    </Checkbox>
                  )}
                </FormControl>
              )}
              {activeStep === 4 && (
                <Flex align='center' direction='column'>
                  <FormLabel fontWeight='bold' mb='2'>
                    Review Form
                  </FormLabel>
                  <Box>
                    <p>Deposit Amount: {formData.depositAmount}</p>
                    <p>User Type: {formData.userType}</p>
                    {formData.userType === 'Buyer' ? (
                      <p>
                        Received Item:{' '}
                        {formData.receivedItem ? 'Received' : 'Not Received'}
                      </p>
                    ) : formData.userType === 'Seller' ? (
                      <p>
                        User Agreement:{' '}
                        {formData.userAgreement ? 'Agreed' : 'Not Agreed'}
                      </p>
                    ) : null}
                  </Box>
                </Flex>
              )}
            </FormControl>
          </Box>
          <Flex justifyContent='center' gap='3' alignItems='center'>
            {activeStep > 0 ? (
              <Button
                mt={3}
                colorScheme='teal'
                onClick={handleBack}
                type='button'>
                Back
              </Button>
            ) : null}
            <Button
              mt={3}
              colorScheme='teal'
              onClick={() => {
                if (isLastStep()) {
                  handleSubmit(onSubmit)();
                } else {
                  handleNext();
                }
              }}
              type='button'
              isDisabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner size='sm' color='white.500' />
              ) : isLastStep() ? (
                'Submit'
              ) : (
                'Next'
              )}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AgreementForm;
