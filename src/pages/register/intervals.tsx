import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  chakra,
  useSteps,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';

const steps = [1, 2, 3, 4];

const daysOfWeek = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sabado',
  'Domingo',
];

export default function RegisterIntervals() {
  const session = useSession();
  const { activeStep } = useSteps({
    index: 2,
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
          Quase lá
        </Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
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
      <chakra.form
        display="flex"
        flexDirection="column"
        borderRadius="md"
        gap={4}
        background="whiteAlpha.100"
        padding={6}
      >
        <Flex
          borderWidth={1}
          borderColor="gray.600"
          borderRadius="md"
          flexDirection="column"
        >
          {daysOfWeek.map((day) => (
            <Flex
              key={day}
              justifyContent="space-between"
              padding={4}
              _notLast={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray.600',
              }}
            >
              <Flex alignItems="center" gap={3}>
                <Checkbox colorScheme="green" />
                {day}
              </Flex>
              <Flex alignItems="center" gap={2} maxWidth="220px">
                <Input
                  background="whiteAlpha.100"
                  colorScheme="green"
                  type="time"
                  step={60}
                  focusBorderColor="green.300"
                  sx={{
                    '&::-webkit-calendar-picker-indicator': {
                      filter: 'invert(100%)',
                    },
                  }}
                />
                <Input
                  background="whiteAlpha.100"
                  colorScheme="green"
                  type="time"
                  step={60}
                  focusBorderColor="green.300"
                  sx={{
                    '&::-webkit-calendar-picker-indicator': {
                      filter: 'invert(100%)',
                    },
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Button colorScheme="green" rightIcon={<ArrowRight />}>
          Próximo passo
        </Button>
      </chakra.form>
    </Flex>
  );
}
