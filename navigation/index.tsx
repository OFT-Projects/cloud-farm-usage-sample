import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabAutomaticScreen from '../screens/TabAutomaticScreen';
import TabManualScreen from '../screens/TabManualScreen';
import { ModuleTabParamList, RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ModuleDetails" component={ModuleBottomTabNavigator} options={({ route }) => ({ title: route.params.module, headerBackTitle: 'Voltar' })}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const ModuleBottomTab = createBottomTabNavigator<ModuleTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          title: 'Módulos',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

function ModuleBottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ModuleBottomTab.Navigator
      initialRouteName="TabAutomatic"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // headerRight: () => (
        //   <Pressable
        //     onPress={() => navigation.navigate('Modal')}
        //     style={({ pressed }) => ({
        //       opacity: pressed ? 0.5 : 1,
        //     })}>
        //     <FontAwesome
        //       name="info-circle"
        //       size={25}
        //       color={Colors[colorScheme].text}
        //       style={{ marginRight: 15 }}
        //     />
        //   </Pressable>
        // ),
      }}>
      <ModuleBottomTab.Screen
        name="TabAutomatic"
        component={TabAutomaticScreen}
        options={{
          headerShown: false,
          title: 'Autônomo',
          tabBarIcon: ({ color }) => <TabBarIcon name="wifi" color={color} /> ,
        }}
      />
      <ModuleBottomTab.Screen
        name="TabManual"
        component={TabManualScreen}
        options={{
          headerShown: false,
          title: 'Manual',
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,
        }}
      />
    </ModuleBottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
