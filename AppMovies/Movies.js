import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }
    static navigationOptions = {
        headerLeft: null,
        headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
                <Icon.Button size={30} backgroundColor='#FFFFFF' color='' name='bell' ></Icon.Button>
            </View>
        ),
        headerTitle: () => (
            <View style={{ flexDirection: 'row' }}>
                <Icon.Button size={30} backgroundColor='#FFFFFF' color='' name='bars' ></Icon.Button>
                <TextInput style={{borderColor: 'gray', borderWidth: 1, width: 230, height:'90%'}}></TextInput>
            </View>
        ),
        headerBackTitleVisible: false,
    };
    componentDidMount() {
        const { navigation } = this.props;
        const genresID = navigation.getParam('genresID', 'NO-ID');
        return fetch('https://api.themoviedb.org/3/genre/' + genresID + '/movies?api_key=72bc46a480f8823b727d49a624315d2e')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.results,
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
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Stack_DetailsMovies', {
                                Moviesid: item.id
                            })}>
                            <Text style={{ fontSize: 25 }}> {item.title}</Text>
                            <Image style={{ width: 300, height: 200, margin: 2 }}
                                source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + item.backdrop_path }} />
                        </TouchableOpacity>
                    }
                    keyExtractor={({ id }, index) => id}
                >
                </FlatList>
            </View>
        )
    }
}