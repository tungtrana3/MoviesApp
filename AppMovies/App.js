import * as React from 'react';
import { View, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Genders from './Genders';
import Movies from './Movies';
import DetailsMovies from './DetailsMovies';

const RootStack = createStackNavigator(
  {
    Stack_Genders: Genders,
    Stack_Movies: Movies,
    Stack_DetailsMovies: DetailsMovies,
  },
  {
    initialRouteName: 'Stack_Genders',
    defaultNavigationOptions: {
      headerLeft: null,
        headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
                <Icon.Button size={30} backgroundColor='#FFFFFF' color='' name='bell' ></Icon.Button>
            </View>
        ),
        headerTitle: () => (
            <View style={{ flexDirection: 'row' }}>
                <Icon.Button size={30} backgroundColor='#FFFFFF' color='' name='bars' ></Icon.Button>
                <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: 230, height: '90%'}}></TextInput>
            </View>
        ),
        headerBackTitleVisible: false,
    }
  });

  export default createAppContainer(RootStack);