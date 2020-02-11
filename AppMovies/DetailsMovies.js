import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image,StyleSheet, Dimensions, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class DetailsMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            id: '',
            backdrop_path: '',
            poster_path: '',
            title: '',
            original_language: '',
            runtime: '',
            release_date: '',
            overview: '',
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
          poster_path: responseJson.poster_path,
          title: responseJson.title,
          original_language: responseJson.original_language,
          overview: responseJson.overview,
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
            <View style={styles.Container}>
        <View style={styles.Img_background}>
          <Image
            source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path }}
            style={{ width: img_width, height: 200 }}
            resizeMode='cover' >
          </Image>
        </View>
        <View style={styles.btn_Button}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={[{ width: "30%", height: "50%", margin: 10, backgroundColor: "red" }]}>
              <Button title="♥" />
            </View>
            <View style={[{ width: "30%", height: "50%", margin: 10, backgroundColor: "red" }]}>
              <Button title="♥" />
            </View>
            <View style={[{ width: "30%", height: "50%", margin: 10, backgroundColor: "red" }]}>
              <Button title="♥" />
            </View>
          </View>
        </View>

        <View style={styles.Details}>
          <View style={styles.Details_title, { flexDirection: 'row' }}>
            <View>
              <Image
                source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.poster_path }}
                style={{ width: 150, height: 150 }}
                resizeMode='cover' >
              </Image>
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{this.state.title}</Text>
              <Text style={{ fontSize: 20 }}>Language: {this.state.original_language}</Text>
              <Text style={{ fontSize: 20 }}>Time: {this.state.runtime} minutes</Text>
              <Text style={{ fontSize: 20 }}>Release date: {this.state.release_date}</Text>
            </View>
          </View>
          <View style={styles.Details_infor}>
            <Text style={{ fontSize: 20}}>
              Contain:
               {this.state.overview}
            </Text>
          </View>
        </View>
      </View>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
      flex: 1,
      //backgroundColor: '#FF99CC',
    },
    Img_background: {
      flex: 3,
      backgroundColor: '#AAAAAA',
    },
    btn_Button: {
      flex: 1,
    },
    Details: {
      flex: 6,
      //backgroundColor: '#FABB00',
      marginTop: 20,
    },
    Details_title: {
      flex: 3,
    },
    Details_infor: {
      flex: 7,
    },
  })
  var { img_width } = Dimensions.get('window');