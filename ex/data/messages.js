import Constant from '../config/Constant'
module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yes, and I use Gifted Chat!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
      
    },
    sent: true,     // สถานะ ว่า ส่งสำเร็จ หรือไหม
    received: true, // สถานะ ว่า ฝั่งตรงข้าม อ่าน หรือไหม
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // }, 
    messageType: Constant.MESSAGE_TYPE.TEXT,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Are you building a chat app?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    messageType: Constant.MESSAGE_TYPE.TEXT,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Are you building a chat app?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    messageType: Constant.MESSAGE_TYPE.TEXT,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "You are officially rocking GiftedChat.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
    messageType: Constant.MESSAGE_TYPE.SYSTEM,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'User 3 = 1',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 3,
      name: 'React Native',
      avatar: 'https://avatars1.githubusercontent.com/u/900211',
    },
    messageType: Constant.MESSAGE_TYPE.TEXT,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'User 3 = 2',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 3,
      name: 'React Native',
      avatar: 'https://avatars1.githubusercontent.com/u/900211',
    },
    messageType: Constant.MESSAGE_TYPE.TEXT,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "You are officially rocking GiftedChat.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
    messageType: Constant.MESSAGE_TYPE.SYSTEM,
  },
];