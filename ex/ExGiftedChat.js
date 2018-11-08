import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid,
  ProgressViewIOS,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';

import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';

import Ionicons from "react-native-vector-icons/Ionicons";
import { AudioRecorder, AudioUtils } from "react-native-audio";

import Sound from "react-native-sound";

import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

import Emoticons from 'react-native-emoticons';

// import Emoticons from 'react-native-emoticons';

import CustomActions from './CustomActions';
import CustomView from './CustomView';

import Constant from './config/Constant'
import { Button } from 'react-native-elements';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

import TabSticker from './TabStickers'
import FlowPage from './react-native-gifted-chat/src/FlowPage'


// https://github.com/FaridSafi/react-native-gifted-chat
export default class ExGiftedChat extends React.Component {
  static navigationOptions = {
    headerTitle: 'ExGiftedChat',
    headerRight: (
      <Ionicons 
        style={{marginRight:15}} 
        name="ios-videocam" 
        size={30}  
        onPress={()=>{
          alert("ios-videocam")
        }}/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,

      renderContent: false,

      // Audio
      startAudio: false,
      hasPermission: false,
      audioPath: `${
            AudioUtils.DocumentDirectoryPath
            }/${this.messageIdGenerator()}test.aac`,
      playAudio: false,
      audioSettings: {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        MeteringEnabled: true,
        IncludeBase64: true,
        AudioEncodingBitRate: 32000
      },
      // Audio

      width: 0, 
      height:0,

      isKeyboradShow:false,
      _stickers:false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderAccessoryView = this.renderAccessoryView.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this.onTest = this.onTest.bind(this);

    this._isAlright = null;

    this.onStickers = this.onStickers.bind(this);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  /*
    ///
  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    console.log("BestGrid : keyboardWillShow")
  }

  keyboardWillHide() {
    console.log("BestGrid : keyboardWillHide")
  }

  ///
  */

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./data/messages.js'),
      };
    });

    // keyboard
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    // keyboard
  }

  componentDidMount(){
    // console.log('componentDidMount')
    setTimeout(() => {this.setState({renderContent: true})}, 0);

    this.checkPermission().then(async hasPermission => {
      this.setState({ hasPermission });
      if (!hasPermission) return;
      await AudioRecorder.prepareRecordingAtPath(
          this.state.audioPath,
          this.state.audioSettings
      );
      AudioRecorder.onProgress = data => {
          console.log(data, "onProgress data");
      };
      AudioRecorder.onFinished = data => {
          console.log(data, "on finish");
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;

    // keyboard
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    // keyboard
  }

  // keyboard
  keyboardWillShow() {
    console.log("ExGiftedChat : keyboardWillShow")
    this.setState({
      isKeyboradShow:true
    })
  }

  keyboardWillHide() {
    console.log("ExGiftedChat : keyboardWillHide")
    this.setState({
      isKeyboradShow:false
    })
  }
  // keyboard

  __showEmoticons(){
    this.setState({
      isKeyboradShow:!this.state.isKeyboradShow
    })
  }

  // __close(){
  //   this.setState({
  //     showEmoticons:false
  //   })
  // }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    // console.log(width, height)

    this.setState({ width: width, height: height });
  }

  checkPermission() {
    if (Platform.OS !== "android") {
        return Promise.resolve(true);
    }
    const rationale = {
        title: "Microphone Permission",
        message:
            "AudioExample needs access to your microphone so you can record audio."
    };
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        rationale
    ).then(result => {
        console.log("Permission result:", result);
        return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  messageIdGenerator() {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onTest(){
    // alert('on')
  }

  onSend(messages = []) {

    // console.log(messages)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
          messageType: Constant.MESSAGE_TYPE.TEXT,
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          onStickers={this.onStickers}
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  onStickers(){
    // alert('onStrickers')

    this.setState({
      _stickers:!this.state._stickers
    })
  }

  renderAudio = props => {
    // console.log('1. renderAudio')
    // console.log(props.currentMessage)
    // console.log('2. renderAudio')

    let progressView
    if(Platform.OS === "ios"){
      progressView = <ProgressViewIOS style={{width: this.state.width - 80, alignItems:'center'}} styleAttr="Horizontal" color="red" progress={0.5} />
    }else{
      progressView = <ProgressBarAndroid  style={{width: this.state.width - 80, left:5, right: 5}} styleAttr="Horizontal" color="red" progress={0.5} />
    }

    return props.currentMessage.messageType !== Constant.MESSAGE_TYPE.AUDIO ? (
        <View /> 
    ) : ( 
          <View style={{backgroundColor:'green', width: this.state.width - 20, alignItems:'center', flexDirection:'row'}}> 
            
            {/* 
            ProgressViewIOS
<ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
            */}
            
            <Ionicons
                name="ios-play"
                size={35}
                color={this.state.playAudio ? "red" : "blue"}
                
                // style={{
                //     // left: 90,
                //     flex:1,
                //     // position: "relative",
                //     shadowColor: "#000",
                //     shadowOffset: { width: 0, height: 0 },
                //     shadowOpacity: 0.5,
                //     backgroundColor: "transparent"
                // }}
                onPress={() => {
                    this.setState({
                        playAudio: true
                    });
                    const sound = new Sound(props.currentMessage.uri, "", error => {
                        if (error) {
                            console.log("failed to load the sound", error);

                            clearInterval(this.interval);     
                        }
                        this.setState({ playAudio: false });
                        sound.play(success => {
                            console.log(success, "success play");
                            if (!success) {
                                Alert.alert("There was an error playing this audio");
                            }

                            clearInterval(this.interval);     
                        });

                        console.log("เวลาทั้งหมด : " + sound.getDuration())

                        this.interval = setInterval(
                          () => /*this.setState({timer: --this.state.timer})*/ sound.getCurrentTime((seconds) => console.log('at ' + seconds)),
                          1000
                        );
                        // sound.getCurrentTime((seconds) => console.log('at ' + seconds));
                    });
                }}
            />

            {progressView}
            <View style={{flex:1, alignItems:'center'}}>
              <Text>0.15</Text>
            </View>
          </View>
        );
  }

  renderBubble(props) {

    // console.log(props.messages)
    return (
      <View>
        {this.renderAudio(props)}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#FFCCCC',
            },
            right: {
              backgroundColor: '#3D43EF',
            }
          }}
        />
      </View>
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  onPressAvatar(user){
    console.log(user)
    alert('onPressAvatar')
  }

  async handleAudio() {
    // const { user } = this.props;
    if (!this.state.startAudio) {
        this.setState({
            startAudio: true
        });
        await AudioRecorder.startRecording();
        console.log("1. handleAudio")
    } else {
        console.log("2. handleAudio")
        await AudioRecorder.stopRecording();
        this.setState({ startAudio: false });
      
        const { audioPath } = this.state;
        const fileName = `${this.messageIdGenerator()}.aac`;
        const file = {
            uri: Platform.OS === "ios" ? audioPath : `file://${audioPath}`,
            name: fileName,
            type: `audio/aac`
        };
        
        // const options = {
        //     keyPrefix: AwsConfig.keyPrefix,
        //     bucket: AwsConfig.bucket,
        //     region: AwsConfig.region,
        //     accessKey: AwsConfig.accessKey,
        //     secretKey: AwsConfig.secretKey,
        // };
        // console.log(file.uri)

        // alert('Path uri : '  + file.uri)

        const message = {};
        message._id = this.messageIdGenerator();
        message.createdAt = Date.now();
        message.user = {
            _id: 1,
            name: 'Developer',
            // avatar: 'https://placeimg.com/140/140/any'
        };
        message.text = "";
        // message.audio = response.headers.Location;
        message.uri = file.uri;
        message.messageType = Constant.MESSAGE_TYPE.AUDIO;

        // this.chatsFromFB.update({
            // messages: [message, ...this.state.messages]
        // });

        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
        


        /*
        RNS3.put(file, options)
            .progress(event => {
                console.log(`percent: ${event.percent}`);
            })
            .then(response => {
                console.log(response, "response from rns3 audio");
                if (response.status !== 201) {
                    alert("Something went wrong, and the audio was not uploaded.");
                    console.error(response.body);
                    return;
                }
                const message = {};
                message._id = this.messageIdGenerator();
                message.createdAt = Date.now();
                message.user = {
                    _id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    avatar: user.avatar
                };
                message.text = "";
                message.audio = response.headers.Location;
                message.messageType = "audio";

                this.chatsFromFB.update({
                    messages: [message, ...this.state.messages]
                });
            })
            .catch(err => {
                console.log(err, "err from audio upload");
            });
            */
    }
  };

  renderAndroidMicrophone() {
    // if (Platform.OS === "android") {

      return (
        null
      )
      return (
          <View style={{alignItems:'flex-start'}}>
            <Ionicons
                name="ios-mic"
                size={35}
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                color={this.state.startAudio ? "red" : "black"}
                // style={{
                //     bottom: 50,
                //     left: 10, //Dimensions.get("window").width / 2,
                //     position: "absolute",
                //     shadowColor: "#000",
                //     shadowOffset: { width: 0, height: 0 },
                //     shadowOpacity: 0.5,
                //     zIndex: 2,
                //     backgroundColor: "transparent"
                // }}
                style={{backgroundColor: 'transparent'}}
                onPress={this.handleAudio.bind(this)}
            />
            <Ionicons
            style={{backgroundColor: 'transparent'}}
                name="ios-keypad"
                size={35} 
                onPress={this.__showEmoticons.bind(this)}
                />
          </View>
        );
    // }
  }

  __clickView1(){
    // alert('__clickView 1')

    // GiftedChat.___test();
    this.onTest()
  }

  __clickView2(){
    alert('__clickView 2')
  }

  __clickView3(){
    alert('__clickView 3')
  }

  renderAccessoryView(){
    if(!this.state.isKeyboradShow){
      // Keyboard.dismiss()

      if(this.state._stickers){
        
        return(
          <ScrollableTabView
           style={{height:250}}
           initialPage={0}
           renderTabBar={() => <DefaultTabBar />}
           locked={true}
           tabBarPosition='top'
          //  contentProps={...props}
           >
           <FlowPage tabLabel='Tab #1' index={0} amount={4} />
           <FlowPage tabLabel='Tab #2' index={1} amount={5}/>
           <FlowPage tabLabel='Tab #3' index={2} amount={6}/>
           <FlowPage tabLabel="Tab #4" index={3} amount={7}/>
         </ScrollableTabView>
       )
      }
    }
      
    return null;
    
  }

  // render() {
  //   return(
  //     <View><Text>test</Text></View>
  //   )
  // }
  render() {

    let {
      renderContent
    } = this.state;

    // console.log("render : " + renderContent)
    // const { user } = this.props; // wherever you user info is
    // console.log('chat render', user)
    // console.log('1. render')
    // console.log(this.state.messages)
    // console.log('2. render')

    /*
    <GiftedChat bottomOffset={ifIphoneX(36, 0)} />
    {
      isIphoneX() &&
      <View style={{ height: 36 }} />
    }
     */

    return (
      <SafeAreaView style={{flex:1}} onLayout={this.onLayout.bind(this)}>
      <View style={{flex:1}}>
       {this.renderAndroidMicrophone()}
       {
        renderContent && 
        <GiftedChat
            ref='myCosyChatReference'
            messages={this.state.messages}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: 1, // sent messages should have same user._id
            }}

            // เป็นเมนู 
            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderSystemMessage={this.renderSystemMessage}
            renderCustomView={this.renderCustomView}
            // renderAccessory={this.renderAccessoryView}
            renderFooter={this.renderFooter}
            placeholder={"Type a message..."}
            onPressAvatar={this.onPressAvatar.bind(this)}
            onTest={this.onTest}
          />
        }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  flowBigView: {
		height: 20,
		backgroundColor: '#fff',
		justifyContent: 'space-around',
		alignItems: 'center'
  },
  flow: {
		flex: 1,
		backgroundColor: '#fff'
	},
});
