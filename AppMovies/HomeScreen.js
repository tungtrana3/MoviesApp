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
    ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Genders from './Genders';
import Movies from './Movies';
import DetailsMovies from './DetailsMovies';
import TrendingWeek from './TrendingWeek';
import TrendingDay from './TrendingDay';
export default class HomeScreen extends React.Component{
    static navigationOptions = {
        drawerLabel: 'Trang chủ',
        drawerIcon: <Icon color='red' name='home'></Icon>
      };
    render(){
        return(
            <ImageBackground source={require('./IMG/background.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.topweekMovies}>
                    <Icon color='red' size={25} name='bookmark'> Top week</Icon>
                    <TrendingWeek></TrendingWeek>
                    <Icon color='red' size={25} name='bookmark'> Top Day</Icon>
                    <TrendingDay></TrendingDay>
                </View>
            </View>
            </ImageBackground> 
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topweekMovies: {
        padding: 5,
    }
})