import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, ListView, TouchableOpacity, Image } from 'react-native';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }
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
            <View style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Stack_DetailsMovies', {
                                Moviesid: item.id
                            })}>
                            <Text style={{fontSize: 25}}> {item.title}</Text>
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