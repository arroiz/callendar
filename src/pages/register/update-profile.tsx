import { api } from '@/lib/api';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  Textarea,
  chakra,
  useSteps,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { buildAuthOptions } from '../api/auth/[...nextauth]';

const steps = [1, 2, 3, 4];

const updateProfileFormSchema = z.object({
  bio: z.string(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  });
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    try {
    } catch (error) {}
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
        onSubmit={handleSubmit(handleUpdateProfile)}
        background="gray.900"
        padding={6}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Text as="label">Foto de perfil</Text>
        <FormControl isInvalid={Boolean(errors.bio)}>
          <FormLabel>sobre você</FormLabel>
          <Textarea
            background="whiteAlpha.100"
            focusBorderColor="green.300"
            {...register('bio')}
          />
        </FormControl>
        <Text fontSize="sm">Fale um pouco sobre você</Text>
        <Button
          colorScheme="green"
          rightIcon={<ArrowRight />}
          isLoading={isSubmitting}
          type="submit"
        >
          Finalizar
        </Button>
      </chakra.form>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, buildAuthOptions(req, res));

  return {
    props: {
      session,
    },
  };
};
