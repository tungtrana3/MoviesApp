import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class DetailsMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            id: '',
            backdrop_path: '',
            title: '',
            original_language: '',
            runtime: '',
            release_date: '',
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const Moviesid = navigation.getParam('Moviesid', 'NO-ID');
        return fetch('https://api.themoviedb.org/3/movie/' + Moviesid + '?api_key=72bc46a480f8823b727d49a624315d2e')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    id: responseJson.id,
                    backdrop_path: responseJson.backdrop_path,
                    title: responseJson.title,
                    original_language: responseJson.original_language,
                    runtime: responseJson.runtime,
                    release_date: responseJson.release_date,
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <View>
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path }}
                        style={{width:200, height: 300}}
                    ></Image>
                </View>
                <View>
                    <Text style={{fontSize: 45, color:'red'}}>{this.state.title}</Text>
                    <Text style={{fontSize: 35}}>Language: {this.state.original_language}</Text>
                    <Text style={{fontSize: 35}}>Time: {this.state.runtime} minutes</Text>
                    <Text style={{fontSize: 35}}>Release date: {this.state.release_date}</Text>
                </View>
            </View>
        )
    }
}