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
            <ImageBackground source={require('./IMG/background.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={this.state.dataSource}
                        numColumns={2}
                        style={{ flex: 1 }}
                        renderItem={({ item }) =>
                            <View style={{ padding: 10 }}>
                                <TouchableOpacity
                                    style={styles.Movies_item}
                                    onPress={() =>
                                        this.props.navigation.navigate('Stack_DetailsMovies', {
                                            Moviesid: item.id
                                        })}>
                                    <View style={{ flex: 7, width: width_item, height: 250 }}>
                                        <Image style={{ flex:1,width: 150, resizeMode:'contain', margin: 2 }}
                                            source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + item.poster_path }} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }} >
                                        <Text style={{ flex: 1, flexWrap: "wrap", fontSize: 15 }}> {item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={({ id }, index) => id}
                    >
                    </FlatList>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    Movies_item: {
        width: width_item,
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
var { width_item } = Dimensions.get('window') / 2;