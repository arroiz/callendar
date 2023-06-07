import { Button, Flex, Text, Input, chakra } from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';

export function ClaimUsernameForm() {
  return (
    <chakra.form
      display="grid"
      borderRadius="md"
      backgroundColor="gray.800"
      padding={4}
      gridTemplateColumns={{ base: '1fr', md: '1fr auto' }}
      gap={2}
      marginTop={4}
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
        />
      </Flex>
      <Button type="submit" rightIcon={<ArrowRight />} colorScheme="green">
        reservar
      </Button>
    </chakra.form>
  );
}
