import React, { Component } from 'react';
import { View, Modal, TouchableNativeFeedback, Text, Button } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


import Icon from 'react-native-vector-icons/FontAwesome';
// const myIcon = (<Icon name="rocket" size={30} color="#900" />)

const images = [
  {
    // Simplest usage.
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    // url:
    // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660246058&di=6f0f1b19cf05a64317cbc5d2b3713d64&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0112a85874bd24a801219c7729e77d.jpg",
    // You can pass props to <Image />.
    // props: {
    //   // headers: ...
    //   source: require('./img.png')
    // },
    source: {
      headers: {
          Authorization: `Bearer`
      }
    },
    freeHeight: true
  },
  {
    // Simplest usage.
    // url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660246058&di=6f0f1b19cf05a64317cbc5d2b3713d64&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0112a85874bd24a801219c7729e77d.jpg",
    // You can pass props to <Image />.
    // props: {
    //   // headers: ...
    //   source: require('./img.png')
    // },

    source: {
      headers: {
          Authorization: `Bearer`
      }
    },
    freeHeight: true
  },
  {
    // Simplest usage.
    // url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660246058&di=6f0f1b19cf05a64317cbc5d2b3713d64&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0112a85874bd24a801219c7729e77d.jpg",
    // You can pass props to <Image />.
    // props: {
    //   // headers: ...
    //   source: require('./img.png')
    // },

    source: {
      headers: {
          Authorization: `Bearer`
      }
    },
    freeHeight: true
  },
  {
    // Simplest usage.
    // url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    url:"https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/body-image/public/mclaren-720s_0.jpg?itok=wZbSZ3FZ",
    // You can pass props to <Image />.
    // props: {
    //   // headers: ...
    //   source: require('./img.png')
    // },

    source: {
      headers: {
          Authorization: `Bearer`
      }
    },
    freeHeight: true
  }

];

export default class ExImageViewer extends Component {
  state = {
    index: 0,
    modalVisible: true
  };

  constructor(props){
    super(props)

  }

  _itemClick(index){
    alert("_itemClick : " + index)
  }

  render() {
    return (
      <View
        style={{
          flex:1,
          padding: 10,
          backgroundColor: "black"
        }}
      >
        <Button onPress={()=>{
          this.setState({
            modalVisible: !this.state.modalVisible
          })
        }}  title="Show Modal lightbox"/>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            imageUrls={images}
            index={this.state.index}
            onSwipeDown={() => {
              console.log('onSwipeDown');
            }}
            onCancel={() => {
              this.setState({
                modalVisible: !this.state.modalVisible
              })
            }}
            enableSwipeDown={true}
            enablePreload={true}
            // backgroundColor="red"
            renderHeader={(currentIndex)=>
              {
              return(<View style={{backgroundColor:'transparent', marginTop:50}}>
                      <Text style={{color:"red"}}>Picture index = {currentIndex}</Text>
                    </View>)
            }
          }
            renderFooter={(currentIndex)=>
              {
              return(<View style={{paddingBottom: 100}}>
                      <Icon onPress={this._itemClick.bind(this, currentIndex)} name="heart" size={30} color="#900" />
                    </View>)
            }
          }
            onClick={(e, currentShowIndex)=>{
              console.log(e)
              console.log(currentShowIndex)
            }}
          />
        </Modal>
      </View>
    );
  }
}