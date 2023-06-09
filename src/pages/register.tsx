import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  chakra,
  useSteps,
} from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';

const steps = [1, 2, 3, 4];

export default function Register() {
  const { activeStep } = useSteps({
    index: 0,
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
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
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
        background="blackAlpha.500"
        padding={6}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <FormControl>
          <FormLabel htmlFor="username">Nome de usuário</FormLabel>
          <Flex
            borderRadius="md"
            alignItems="center"
            color="gray.100"
            paddingX={2}
            background="blackAlpha.900"
            cursor="text"
            _focusWithin={{
              outlineWidth: 2,
              outlineStyle: 'solid',
              outlineColor: 'green.300',
            }}
          >
            <Text>callendar.com/</Text>
            <Input
              id="username"
              placeholder="seu usuário"
              border="none"
              color="white"
              paddingLeft={1}
              _focusVisible={{
                borderColor: 'none',
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>Nome completo</FormLabel>
          <Input type="text" focusBorderColor="green.300" />
        </FormControl>
        <Button colorScheme="green" rightIcon={<ArrowRight />}>
          Próximo passo
        </Button>
      </chakra.form>
    </Flex>
  );
}
