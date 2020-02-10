import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
  });

  export default createAppContainer(RootStack);