import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';

import { Routes } from './src/Routes';

import theme from './src/theme'
import { AppRoutes } from 'src/Routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular,Roboto_700Bold });

//fontloaded indica que a minha fonte está carregando a
  return (   
    <ThemeProvider theme = {theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent

      />
    { fontsLoaded ?  <Routes/> : <Loading/>} 
    </ThemeProvider>
);




  }
