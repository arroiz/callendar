import { convertTimeInMinutes } from '@/utils/convert-time-in-minuts';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'phosphor-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
  intervals: z
    .array(
      z.object({
        weekday: z.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'É necessário selecionar pelo menos um dia da semana',
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekday: interval.weekday,
        startTimeInMinutes: convertTimeInMinutes(interval.startTime),
        endTimeInMinutes: convertTimeInMinutes(interval.endTime),
      }))
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - interval.startTimeInMinutes >= 60
        ),
      {
        message:
          'O intervalo entre o início e fim deve ser maior que 60 minutos',
      }
    ),
});

type TimeIntervalsFormDataInput = z.input<typeof timeIntervalFormSchema>;
type TimeIntervalsFormDataOutput = z.output<typeof timeIntervalFormSchema>;

export default function RegisterIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormDataInput, any, TimeIntervalsFormDataOutput>({
    resolver: zodResolver(timeIntervalFormSchema),
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

  const intervals = watch('intervals');

  async function handleSetTimeIntervals(data: TimeIntervalsFormDataOutput) {}

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
          {fields.map(({ id, weekday }, index) => (
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
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      colorScheme="green"
                      id={`intervals.${index}.enabled`}
                      defaultChecked={field.value}
                      checked={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.checked);
                      }}
                    />
                  )}
                />
                <Text as="label" htmlFor={`intervals.${index}.enabled`}>
                  {daysOfWeek[weekday]}
                </Text>
              </Flex>
              <Flex alignItems="center" gap={2} maxWidth="230px">
                <Input
                  background="whiteAlpha.100"
                  colorScheme="green"
                  type="time"
                  step={60}
                  focusBorderColor="green.300"
                  disabled={!intervals[index].enabled}
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
                  disabled={!intervals[index].enabled}
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
        {errors?.intervals?.message ? (
          <Text color="red.400" fontSize="sm">
            {errors?.intervals?.message}
          </Text>
        ) : null}
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
