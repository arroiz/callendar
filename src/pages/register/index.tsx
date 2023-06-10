import { api } from '@/lib/api';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { useEffect } from 'react';
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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router?.query, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', { name: data.name, username: data.username });

      await router.push('/register/connect-calendar');
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error?.response?.data?.message || 'Erro na criação do usuário'
        );
      }

      console.log(error);
    }
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
        background="gray.900"
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
            paddingX={2}
            background="whiteAlpha.100"
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
              background="transparent"
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
            background="whiteAlpha.100"
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
