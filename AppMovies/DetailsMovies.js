import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      vote_average: '',
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
          vote_average: responseJson.vote_average,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    var loop_star = [];
    for (let i = 0; i < (this.state.vote_average * 0.5); i++) {
      loop_star.push(
        <Icon name="star" color="yellow" size={30} />
      );
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={styles.Img_background}>
            <Image
              source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path }}
              style={{ width: img_width, height: 200 }}
              resizeMode='cover' >
            </Image>
          </View>
          <View style={styles.btn_Button}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <View style={styles.View_Icon_button}>
                <Icon.Button style={styles.Icon_button} color='red' name='heart'></Icon.Button>
              </View>
              <View style={styles.View_Icon_button}>
                <Icon.Button style={styles.Icon_button} color='red' name='bell'>Trailer</Icon.Button>
              </View>
              <View style={styles.View_Icon_button}>
                <Icon.Button style={styles.Icon_button} color='green' name='arrow-circle-down' >Download</Icon.Button>
              </View>
            </View>
          </View>

          <View style={styles.Details}>

            <View style={styles.Details_title, { flexDirection: 'row' }}>
              <View>
                <Image
                  source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.poster_path }}
                  style={{ width: 180, height: 230 }}
                  resizeMode='cover' >
                </Image>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{this.state.title}</Text>
                <View style={{ flexDirection: 'row' }}>{loop_star}</View>
                <Text></Text>
                <Text style={{ fontSize: 20 }}><Icon name='hourglass-start' size={20}></Icon> {this.state.runtime} minutes</Text>
                <Text style={{ fontSize: 20 }}><Icon name='language' size={20}></Icon> {this.state.original_language}</Text>
                <Text style={{ fontSize: 20 }}><Icon name='calendar' size={20}></Icon> {this.state.release_date}</Text>
              </View>
            </View>
            <View style={styles.Details_infor}>
              <Text style={{ fontSize: 20 }}>
                Contain:
               {this.state.overview}
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  View_Icon_button: {
    width: "25%",
    height: "50%",
    margin: 10,
    paddingTop: 10,
  },
  Icon_button: {
    backgroundColor: '#A9CCE3',
  },
  Img_background: {
    flex: 3,
    backgroundColor: '#AAAAAA',
  },
  btn_Button: {
    flex: 0.75,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  Details: {
    flex: 6,
    paddingLeft: 20,
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