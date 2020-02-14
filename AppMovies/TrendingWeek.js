import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RootStack from './App';
export default class TrendingWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/trending/all/week?api_key=72bc46a480f8823b727d49a624315d2e')
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
      )
    }
    return (
      <View style={{ height: 200 }}>
        <FlatList
          data={this.state.dataSource}
          style={{ flex: 1 }}
          horizontal={true}
          renderItem={({ item }) =>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={styles.Movies_item}
                onPress={() =>
                  this.props.navigation.navigate('Stack_DetailsMovies', {
                    Moviesid: item.id
                  })}>
                <View style={{ flex: 7, width: width_item }}>
                  <Image style={{ width: 80, height: 120, margin: 2 }}
                    source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + item.backdrop_path }} />
                </View>
                <View style={{ flexDirection: 'row' , flexShrink:1}} >
                  <Text style={{ flexDirection:'column',flex:0.8, flexWrap: "wrap"}}> {item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={({ id }, index) => id}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Movies_item: {
    width: width_item,
    flex: 1,
    flexDirection: 'column',
    flexShrink:1,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
var { width_item } = Dimensions.get('window') / 2;
