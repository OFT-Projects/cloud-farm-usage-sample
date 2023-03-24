import { VStack, ScrollView, Box, Pressable, HStack, Badge, Spacer, Text } from 'native-base';

import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <VStack space={8} alignItems="center">
        <Box alignItems="center">
          <Pressable maxW="96" onPress={() => navigation.navigate('ModuleDetails', { screen: 'TabAutomatic', module: 'module-125' })}>
            {({
            isHovered,
            isPressed
          }) => {
            return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
              transform: [{
                scale: isPressed ? 0.96 : 1
              }]
            }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                  <HStack alignItems="center">
                    <Badge colorScheme="green" _text={{
                  color: "white"
                }} variant="solid" rounded="4">
                      EM FUNCIONAMENTO
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="coolGray.800">
                      IAHMS-I
                    </Text>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    modulo-125
                  </Text>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    Módulo concebido por dois sistemas principais: Sistema Coletor e Sistema Injetor
                  </Text>
                </Box>;
          }}
          </Pressable>
        </Box>
      </VStack>
    </ScrollView>
  );
}
