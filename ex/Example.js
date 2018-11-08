import React from 'react'
import {TouchableHighlight, TouchableOpacity, Text, Button, View} from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat'
import Ionicons from "react-native-vector-icons/Ionicons";

import { connect } from 'react-redux';
import { AbstractWelcomePage, _mapStateToProps } from '../react/features/welcome/components/AbstractWelcomePage';


import { translate } from '../react/features/base/i18n';

let _this = null;

export default class Example extends AbstractWelcomePage {
  state = {
    messages: [],
  }

  
  // static navigationOptions = {
  //   headerTitle: 'ExGiftedChat',
  //   headerRight: (
  //   //   <Ionicons 
  //   //     style={{marginRight:15}} 
  //   //     name="ios-videocam" 
  //   //     size={30}  
  //   //     onPress={()=>{
  //   //         // this.onJoin
  //   //         this.onJoin
  //   //     }}/>
  //   <TouchableHighlight
  //         style={{alignItems: 'center',
  //         backgroundColor: '#DDDDDD',
  //         padding: 10}}
  //         onPress={this._onJoin}
  //         // onPress={()=>this.observer.publish("hello",'this is data')}
  //         >
  //             <Text> _onJoin </Text>
  //         </TouchableHighlight>
  //   ),
  // };

  

    // static navigationOptions = ({navigation}) => {
    //     const { state } = navigation
    //     return {
    //         title: navigation.state.params.title,
    //       //   headerRight: 
    //       //                   <TouchableHighlight
    //       // style={{alignItems: 'center',
    //       // backgroundColor: '#DDDDDD',
    //       // padding: 10}}
    //       // onPress={ () => params._onJoin } 
    //       // // onPress={()=>this.observer.publish("hello",'this is data')}
    //       // >
    //       //     <Text> _onJoin </Text>
    //       // </TouchableHighlight>
    //       headerRight: <Button title="Save" onPress={() => state.params.handleSave()} />,

    //     };
    // };


//   constructor(props){
//       super(props)
//     //   this.onJoin = this.onJoin.bind(this)
//   }

//   static onJoin(){
//     // this._onJoin
//     // alert("onJoin")

//     // _this._onJoin
//   }


static navigationOptions = {
  header: null
}


    constructor(props){
      super(props)

      this.navigationOptions = {
        header: ( /* Your custom header */
          <View
            style={{
              height: 80,
              marginTop: 20 /* only for IOS to give StatusBar Space */
            }}
          >
            <Text>This is CustomHeader</Text>
          </View>
        )
      };
      
    }

    componentDidMount() {
      this.props.navigation.setParams({ handleSave: () => this.saveDetails() })
    }

    saveDetails() {
      // alert('saved')
      this._onJoin
      console.log("this._onJoin")
    }

    // componentDidMount() {
    //     this.props.navigation.setParams({
    //         handleRefresh: this.refreshHandler
    //     });
    // }

    refreshHandler() {
        // alert('hello')
        // self.refs[WEBVIEW_REF].reload()
        console.log(this)
        this._onJoin
    }

  componentWillMount() {


    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
        <View style={{flex:1}}>
        <TouchableOpacity
          style={{alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 10}}
          onPress={this._onJoin}
          // onPress={()=>this.observer.publish("hello",'this is data')}
          >
              <Text> _onJoin </Text>
          </TouchableOpacity>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </View>
    )
  }
}

