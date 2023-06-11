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
import { ArrowRight, Check } from 'phosphor-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const steps = [1, 2, 3, 4];

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const hasAuthError = Boolean(router.query.error);
  const hasAuthentication = session.status === 'authenticated';

  async function handleConnectCalendar() {
    await signIn('google');
  }

  async function goToNextStep() {
    await router.push('/register/intervals');
  }

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
            rightIcon={hasAuthentication ? <Check /> : <ArrowRight />}
            onClick={handleConnectCalendar}
            isDisabled={hasAuthentication}
          >
            {hasAuthentication ? 'Conectado' : 'Conectar'}
          </Button>
        </Flex>
        {hasAuthError ? (
          <Text color="red.400" size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </Text>
        ) : null}
        <Button
          colorScheme="green"
          rightIcon={<ArrowRight />}
          isDisabled={!hasAuthentication}
          onClick={goToNextStep}
        >
          Próximo passo
        </Button>
      </Flex>
    </Flex>
  );
}
