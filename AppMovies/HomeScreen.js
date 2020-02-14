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
export default class HomeScreen extends React.Component{
    static navigationOptions = {
        drawerLabel: 'Trang chủ',
        drawerIcon: <Icon color='red' name='home'></Icon>
      };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topweekMovies}>
                    <Icon color='red' size={30} name='bookmark'> Top week</Icon>
                    <TrendingWeek></TrendingWeek>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFCCFF',
    },
    topweekMovies: {
        padding: 5,
    }
})