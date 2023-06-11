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
import { ArrowRight } from 'phosphor-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const steps = [1, 2, 3, 4];

const daysOfWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sabado',
];

const timeIntervalFormSchema = z.object({
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

export default function RegisterIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  });
  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  });

  async function handleSetTimeIntervals() {}

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
        onSubmit={handleSubmit(handleSetTimeIntervals)}
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
          {fields.map(({ enabled, endTime, id, startTime, weekday }, index) => (
            <Flex
              key={id}
              justifyContent="space-between"
              padding={4}
              _notLast={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray.600',
              }}
            >
              <Flex alignItems="center" gap={3}>
                <Checkbox
                  colorScheme="green"
                  {...register(`intervals.${index}.enabled`)}
                />
                {daysOfWeek[weekday]}
              </Flex>
              <Flex alignItems="center" gap={2} maxWidth="230px">
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
                  {...register(`intervals.${index}.startTime`)}
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
                  {...register(`intervals.${index}.endTime`)}
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
