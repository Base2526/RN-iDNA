import React, { Component } from 'react'
import {Text, 
        View, 
        Dimensions, 
        StyleSheet, 
        Platform, 
        SafeAreaView, 
        Alert,
        TouchableHighlight} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Button } from 'react-native-elements';

import Emoticons from 'react-native-emoticons';

import { connect } from 'react-redux';
import { AbstractWelcomePage, _mapStateToProps } from '../react/features/welcome/components/AbstractWelcomePage';
import { translate } from '../react/features/base/i18n';


import ReactObserver from 'react-event-observer';

import ExImageViewer from './ExImageViewer'
// import ImageViewer from 'react-native-image-zoom-viewer';

// var RNFS = require('react-native-fs')
// import IMUI from 'aurora-imui-react-native'

// var InputView = IMUI.ChatInput
// var MessageListView = IMUI.MessageList
// const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')

// import ExGiftedChat from './ExGiftedChat'

import Example from './Example'

class App extends AbstractWelcomePage {

  constructor(props) {
    super(props);
    this.state = {
      showEmoticons:false
    }

    this.observer = ReactObserver();

    // this._onJoin
  }

  componentDidMount(){
    this.observer.subscribe("hello",(data)=>{
        console.log('hello event data: ' + data);

        this._onJoin
    });
  }

  render() {
    return <MyNavigator screenProps={this.observer} />;

  //   return(
  // <View style={{flex:1}}>
  //         <TouchableHighlight
  //         style={{alignItems: 'center',
  //         backgroundColor: '#DDDDDD',
  //         padding: 10}}
  //         onPress={this._onJoin}
  //         >
  //             <Text> _onJoin </Text>
  //         </TouchableHighlight>
  //     </View>
  //   )
  }
}

export default translate(connect(_mapStateToProps)(App));



function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

class ScreenComponentOne extends AbstractWelcomePage {
  static navigationOptions = {
    headerTitle: 'First screen',
  };

  constructor(props) {
    super(props);
    this.state = {
      showEmoticons:false
    }

    console.log(props)

    this.observer = props.screenProps;

    // this.observer = ReactObserver();

    // this._onJoin
  }

  __open(){
    this.setState({
      showEmoticons:true
    })
  }

  __close(){
    this.setState({
      showEmoticons:false
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // borderWidth: 25,
          borderColor: 'teal',
          alignItems:'center'
        }}>

        {/* <Button title={`open`} onPress={this.__open.bind(this)}></Button>
        <Button title={`close`} onPress={this.__close.bind(this)}></Button> */}
        {/* <Button
          title="Go to two"
          onPress={() => this.props.navigation.navigate('RouteNameTwo')}
        /> */}
        {/* <Text onPress={() => this.props.navigation.navigate('RouteNameTwo')}>Go to chat page</Text> */}
        <Button
          // raised
          // icon={{name: 'home', size: 32}}
          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Go to ExGiftedChat page`}
          onPress={() => this.props.navigation.push('RouteNameTwo', {
            title: 'Chat page',
            itemId: 86,
            otherParam: 'anything you want here',
          })}
        />
        <Button
          // raised
          // icon={{name: 'home', size: 32}}
          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Go to ExImageViewer page`}
          style={{marginTop:10}}
          onPress={() => this.props.navigation.push('ExImageViewer', {
            title: 'Chat page',
            itemId: 86,
            otherParam: 'anything you want here',
          })}
        />


        {/* <Button title="hh" onPress={()=> this.observer.publish("hello",'this is data') }></Button> */}

          <TouchableHighlight
          style={{alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 10}}
          onPress={this._onJoin}
          // onPress={()=>this.observer.publish("hello",'this is data')}
          >
              <Text> _onJoin </Text>
          </TouchableHighlight>

        {/* <Emoticons
          show={this.state.showEmoticons}
          concise={true}
          showHistoryBar={true}
          showPlusBar={true}
        /> */}
      </View>
      </SafeAreaView>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    headerTitle: 'Second screen',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button
          title="Go to three"
          onPress={() =>
            this.props.navigation.navigate('RouteNameThree', {
              randomNumber: getRandomNumber(),
            })
          }
        />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: `Number: ${navigation.getParam('randomNumber')}`,
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 25,
          borderColor: 'purple',
        }}>
        <Text style={{ fontSize: 25 }}>
          {this.props.navigation.getParam('randomNumber')}
        </Text>
        <Button
          title="Get a new random number"
          onPress={() => {
            this.props.navigation.setParams({
              randomNumber: getRandomNumber(),
            });
          }}
        />
        <Button
          title="Add another two"
          onPress={() => this.props.navigation.push('RouteNameTwo')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

// translate(connect(_mapStateToProps)(ScreenComponentOne))
const MyNavigator = createStackNavigator(
  {
    RouteNameOne: translate(connect(_mapStateToProps)(ScreenComponentOne)),
    RouteNameTwo: translate(connect(_mapStateToProps)(Example)),
    ExImageViewer: ExImageViewer,
    // RouteNameThree: ScreenComponentThree,
  },
  {
    // headerTransitionPreset: 'uikit',
    // mode: 'modal',
  }
);