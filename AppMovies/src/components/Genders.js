import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RootStack from '../../App';
export default class Genders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  static navigationOptions = {
    drawerLabel: 'Thể loại',
    drawerIcon: <Icon color='red' name='home'></Icon>
  };
  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=72bc46a480f8823b727d49a624315d2e')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.genres,
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
      <ImageBackground source={require('../assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={this.state.dataSource}
            numColumns={2}

            renderItem={({ item }) =>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.btn_genders}
                  onPress={() => {
                    this.props.navigation.navigate('Stack_Movies', {
                      genresID: item.id,
                    });
                  }}
                ><Text style={{ fontSize: 18 }}>{item.name}</Text></TouchableOpacity>
              </View>
            }
            keyExtractor={({ id }, index) => id}
          >
          </FlatList>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  btn_genders: {
    flex: 1,
    height: 50,
    padding: 20,
    borderRadius: 10,
    borderColor: 'pink',
    borderWidth: 5,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCFF',
  },
});
var { width_item } = Dimensions.get('window') / 2;
