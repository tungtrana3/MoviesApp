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
                <TextInput style={{ borderColor: 'gray', borderWidth: 1, width: 230, height: '90%' }}></TextInput>
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
                    numColumns={2}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.Movies_item}
                            onPress={() =>
                                this.props.navigation.navigate('Stack_DetailsMovies', {
                                    Moviesid: item.id
                                })}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 7, width:width_item }}>
                                    <Image style={{ width: 160, height: 200, margin: 2 }}
                                        source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + item.backdrop_path }} />
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{  flex: 1,flexWrap: "wrap", fontSize: 15 }}> {item.title}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={({ id }, index) => id}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Movies_item: {
        width: width_item,
        paddingLeft: 20,
    },
});
var { width_item } = Dimensions.get('window') / 2;