import { Button, Flex, Text, Input, chakra } from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data);
  }

  return (
    <>
      <chakra.form
        onSubmit={handleSubmit(handleClaimUsername)}
        display="grid"
        borderRadius="md"
        backgroundColor="gray.800"
        padding={4}
        gridTemplateColumns={{ base: '1fr', md: '1fr auto' }}
        gap={2}
        marginTop={4}
        position="relative"
      >
        <Flex
          as="label"
          htmlFor="username"
          borderRadius="md"
          alignItems="center"
          color="gray.500"
          paddingX={2}
          background="gray.900"
          cursor="text"
          _focusWithin={{
            outlineWidth: 1,
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
            {...register('username')}
          />
        </Flex>
        <Button type="submit" rightIcon={<ArrowRight />} colorScheme="green">
          reservar
        </Button>
        <Text
          position="absolute"
          left={5}
          bottom="0"
          fontSize="2xs"
          color={errors.username?.message ? 'red.500' : 'gray.500'}
        >
          {errors.username?.message || 'Digite o nome do usuário desejado'}
        </Text>
      </chakra.form>
    </>
  );
}
