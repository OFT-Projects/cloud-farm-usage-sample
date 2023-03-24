import { Radio, VStack, HStack, ScrollView, Center, Text, Button, useToast, Box, Select, CheckIcon, Input } from 'native-base';
import { useCallback, useState } from 'react';

import { ModuleTabScreenProps } from '../types';

export default function TabAutomaticScreen({ navigation }: ModuleTabScreenProps<'TabAutomatic'>) {
  const baseUrl = process.env.BASE_URL;

  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const [measure, setMeasure] = useState("");

  const toast = useToast();
  
  const handleAutomaticChange = useCallback(async () => {
    try {
      setLoading(true);

      let updatedMeasure = measure;

      if (measure === "minutes") {
        if (Number(time) === 1) {
          updatedMeasure = "minute";
        }
      } else if (measure === "hours") {
        if (Number(time) === 1) {
          updatedMeasure = "hour";
        }
      } else {
        if (Number(time) === 1) {
          updatedMeasure = "day";
        }
      }

      const response = await fetch(`${baseUrl}/psu/module_125`, {
        method: 'POST',
        body: JSON.stringify({
          psu: [
            {
              order: 1,
              state_update: {
                components: [
                  {
                    component: value,
                    value: 1
                  }
                ]
              }
            },
            {
              order: 2,
              state_update: {
                components: [
                  {
                      component: value,
                      value: 0
                  }
                ]
              }
            }
          ],
          schedule_expression: `rate(${time} ${updatedMeasure.toString()})`
        })
      });

      if (response.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.400" px="2" py="1" rounded="sm" mb={5}>
                Agendado com sucesso!
              </Box>
            )
          }
        });
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="red.400" px="2" py="1" rounded="sm" mb={5}>
                Ocorreu um erro!
              </Box>
            )
          }
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [measure, value]);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 36, }}>
        <VStack space={4} alignItems="center">
          <HStack space={3} justifyContent="flex-end">
            <Center bg="coolGray.100" w="90%" p="36" rounded="md" shadow={3} alignItems="flex-start">
              <Radio.Group name="component" onChange={setValue} value={value} > 
                <Radio value="led" my="2">LED</Radio>
                <Radio value="pump" my="2">PUMP</Radio>
                <Radio value="fan" my="2">FAN</Radio>
              </Radio.Group>

              <HStack space={3} justifyContent="space-between">
                <Box mt="6" minWidth="35%">
                  <Input h="12" placeholder="Num" value={time} onChangeText={setTime} keyboardType="numeric" />
                </Box>

                <Box mt="6" minWidth="60%" alignSelf="flex-end">
                  <Select selectedValue={measure} h="12" placeholder="Medida" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} onValueChange={itemValue => setMeasure(itemValue)}>
                    <Select.Item label="Minutos" value="minutes" />
                    <Select.Item label="Horas" value="hours" />
                    <Select.Item label="Dias" value="days" />
                  </Select>
                </Box>
              </HStack>
              
              <Button 
                isLoading={isLoading} 
                spinnerPlacement="end"
                isLoadingText="Agendando"
                mt="6"
                alignSelf="flex-end"
                h="12"
                w="100%" 
                bg="green.600"
                onPress={handleAutomaticChange}
              >
                Agendar
              </Button>
            </Center>
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
}
