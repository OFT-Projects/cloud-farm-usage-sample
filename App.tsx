import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from "native-base";
import { LogBox } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </NativeBaseProvider>
    );
  }
}
