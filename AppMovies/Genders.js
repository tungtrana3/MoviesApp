import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RootStack from './App';
export default class Genders extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=72bc46a480f8823b727d49a624315d2e')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.genres,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          numColumns={2}
          renderItem={({item}) => 
          <Button 
            title={item.name}
            style={styles.btn_genders}
            onPress={() => {
              this.props.navigation.navigate('Stack_Movies', {
                genresID : item.id,
              });
            }}
            ></Button>
          }
          keyExtractor={({id}, index) => id}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    btn_genders: {
      width:width_item,
      backgroundColor: '#0059FF',
      padding: 4,
    },
});
var { width_item } = Dimensions.get('window') / 2;
