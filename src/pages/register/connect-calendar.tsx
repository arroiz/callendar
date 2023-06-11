import {
  Button,
  Flex,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  useSteps,
} from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';
import { signIn } from 'next-auth/react';

const steps = [1, 2, 3, 4];

export default function ConnectCalendar() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Flex
      maxWidth="572px"
      top={20}
      marginX="auto"
      marginBottom={4}
      marginTop={20}
      paddingX={4}
      flexDirection="column"
      gap={6}
    >
      <Flex flexDirection="column" paddingX={6}>
        <Heading as="strong" fontSize="2xl" lineHeight="1.6">
          Conecte sua agenda!
        </Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <Stepper index={activeStep} size="sm" colorScheme="green" marginTop={6}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Flex>
      <Flex
        background="whiteAlpha.100"
        padding={6}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Flex
          paddingX={6}
          paddingY={4}
          borderColor="whiteAlpha.100"
          borderWidth={1}
          borderRadius="md"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>Google Agenda</Text>
          <Button
            colorScheme="green"
            variant="outline"
            rightIcon={<ArrowRight />}
            onClick={() => signIn('google')}
          >
            Conectar
          </Button>
        </Flex>
        <Button colorScheme="green" rightIcon={<ArrowRight />}>
          Próximo passo
        </Button>
      </Flex>
    </Flex>
  );
}
