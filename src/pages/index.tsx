import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

import heroImage from '@/assets/hero-image.png';
import { ClaimUsernameForm } from '@/components/claim-username-form';

export default function Home() {
  return (
    <Flex
      maxWidth="calc(100vw - (100vw - 1160px) / 2)"
      marginLeft="auto"
      alignItems="center"
      gap={20}
      height="100vh"
      padding={8}
    >
      <Box maxWidth="480px">
        <Heading as="h1" lineHeight="1.2" fontSize={{ base: '4xl', md: '6xl' }}>
          Agendamento descomplicado
        </Heading>
        <Text
          color="gray.300"
          lineHeight="1.6"
          fontSize={{ base: 'md', md: 'xl' }}
        >
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Box>
      <Box
        as={Image}
        src={heroImage}
        height={400}
        quality={100}
        priority
        alt=""
        display={{
          base: 'none',
          md: 'block',
        }}
      />
    </Flex>
  );
}
