import React, { Component } from 'react';
import {
    FlatList,
    ActivityIndicator,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Genders from './Genders';
import Movies from './Movies';
import DetailsMovies from './DetailsMovies';
import TrendingWeek from './TrendingWeek';

export default class HomeScrees extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <TrendingWeek></TrendingWeek>
            </View>
        );
    }
}