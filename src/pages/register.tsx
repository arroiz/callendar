import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const steps = [1, 2, 3, 4];

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  function handleRegister(data: RegisterFormData) {
    console.log(data);
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
        onSubmit={handleSubmit(handleRegister)}
        background="blackAlpha.500"
        padding={6}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <FormControl isInvalid={Boolean(errors.username)}>
          <FormLabel htmlFor="username">Nome de usuário</FormLabel>
          <Flex
            borderRadius="md"
            alignItems="center"
            color="gray.100"
            paddingX={2}
            background="blackAlpha.900"
            cursor="text"
            role="group"
            _focusWithin={{
              outlineWidth: 2,
              outlineStyle: 'solid',
              outlineColor: 'green.300',
            }}
            sx={{
              outlineWidth: Boolean(errors.username) ? 2 : 0,
              outlineStyle: 'solid',
              outlineColor: 'red.500',
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
              _invalid={{
                borderColor: 'none',
              }}
              {...register('username')}
            />
          </Flex>
          {errors.username ? (
            <FormErrorMessage data-peer>
              {errors.username.message}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel>Nome completo</FormLabel>
          <Input
            type="text"
            focusBorderColor="green.300"
            {...register('name')}
          />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button
          colorScheme="green"
          rightIcon={<ArrowRight />}
          isLoading={isSubmitting}
          type="submit"
        >
          Próximo passo
        </Button>
      </chakra.form>
    </Flex>
  );
}
