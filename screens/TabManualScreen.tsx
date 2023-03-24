import { Switch, VStack, HStack, ScrollView, Center, Text, Button, useToast, Box } from 'native-base';
import { useState, useCallback } from 'react';

export default function TabManualScreen() {
  const baseUrl = process.env.BASE_URL;

  const [isLedOn, setIsLedOn] = useState(false);
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();
  
  const handleManualChange = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/mcsu/modulo_125`, {
        method: 'POST',
        body: JSON.stringify({
          state_update: { 
            components: [ 
              {
                component: "led", 
                value: isLedOn ? 1 : 0, 
              },
              { 
                component: "pump", 
                value: isPumpOn ? 1 : 0, 
              },
              { 
                component: "fan", 
                value: isFanOn ? 1 : 0, 
              }
            ] 
          } 
        })
      });

      if (response.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.400" px="2" py="1" rounded="sm" mb={5}>
                Salvo com sucesso!
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
  }, [isLedOn, isPumpOn, isFanOn]);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 36, }}>
        <VStack space={4} alignItems="center">
          <HStack space={3} justifyContent="flex-end">
            <Center bg="coolGray.100" w="90%" display="flex" flexDirection="row" rounded="md" shadow={3}>
              <Center h="20" w="60%" alignItems="flex-start" justifyContent="center">
                <Text color="coolGray.800" ml="4" fontWeight="medium" fontSize="xl">
                  LED
                </Text>
              </Center>
              
              <Center h="20" w="40%">
                <Switch colorScheme="emerald" value={isLedOn} onValueChange={v => setIsLedOn(v)} />
              </Center>
            </Center>
          </HStack>
          
          <HStack space={3} justifyContent="flex-end">
            <Center bg="coolGray.100" w="90%" display="flex" flexDirection="row" rounded="md" shadow={3}>
              <Center h="20" w="60%" alignItems="flex-start" justifyContent="center">
                <Text color="coolGray.800" ml="4" fontWeight="medium" fontSize="xl">
                  PUMP
                </Text>
              </Center>
              
              <Center h="20" w="40%">
                <Switch colorScheme="emerald" value={isPumpOn} onValueChange={v => setIsPumpOn(v)} />
              </Center>
            </Center>
          </HStack>
          
          <HStack space={3} justifyContent="flex-end">
            <Center bg="coolGray.100" w="90%" display="flex" flexDirection="row" rounded="md" shadow={3}>
              <Center h="20" w="60%" alignItems="flex-start" justifyContent="center">
                <Text color="coolGray.800" ml="4" fontWeight="medium" fontSize="xl">
                  FAN
                </Text>
              </Center>
              
              <Center h="20" w="40%">
                <Switch colorScheme="emerald" value={isFanOn} onValueChange={v => setIsFanOn(v)}/>
              </Center>
            </Center>
          </HStack>
        </VStack>
      </ScrollView>
      
      <Button 
        isLoading={isLoading} 
        spinnerPlacement="end" 
        isLoadingText="Salvando" 
        position="absolute" 
        bottom="1" 
        mb="36" 
        alignSelf="center" 
        h="12" 
        w="48" 
        bg="green.600" 
        onPress={handleManualChange}
      >
        Salvar
      </Button>
    </>
  );
}
