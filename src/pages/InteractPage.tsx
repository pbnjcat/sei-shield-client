import { Box, Image, useSteps } from '@chakra-ui/react';
import styled from 'styled-components';
import SeiShieldLogo from '../components/images/SeiShieldLogo.png';
import AgreementForm from '../components/AgreementForm';
import FormStepper from '../components/FormStepper';
const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const steps = [
  { title: 'Connect' },
  { title: 'I am...', description: 'Buyer / Seller' },
  { title: 'Make Deposit', description: 'Deposit Amount' },
  { title: 'Review', description: 'Transaction' },
  { title: 'Confirm' },
];

const InteractPage = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  function isLastStep() {
    return activeStep === steps.length - 1;
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) { 
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <CustomBox>
      <Image boxSize='200px' src={SeiShieldLogo} alt='Sei Logo' />
      <Box>
        <FormStepper activeStep={activeStep} steps={steps} />
        <AgreementForm
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isLastStep={isLastStep}
        />
      </Box>
    </CustomBox>
  );
};

export default InteractPage;
