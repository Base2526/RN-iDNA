import React from 'react'
import {AppRegistry, 
        View, 
        Text,
        TouchableHighlight,
        StyleSheet} from 'react-native'

import { connect } from 'react-redux';
import { AbstractWelcomePage, _mapStateToProps } from '../react/features/welcome/components/AbstractWelcomePage';

// import { translate } from '../../base/i18n';

import { translate } from '../react/features/base/i18n';


/**
 * The type of the React {@code Component} props of {@link Root}.
 */
type Props = {

    /**
     * The URL, if any, with which the app was launched.
     */
    url: Object | string
};

/**
 * The type of the React {@code Component} state of {@link Root}.
 */
type State = {

    /**
     * The URL, if any, with which the app was launched.
     */
    url: ?Object | string
};

class App extends AbstractWelcomePage{

    constructor(props){
        super(props)

        // console.log("1, this.props")
        // console.log(this.props)
        // console.log("2, this.props")
        // console.log("1, this.state")
        // console.log(this.state)
        // console.log("2, this.state")
    }
    render(){

        // const buttonDisabled = this._isJoinDisabled();

        return(
            <View style={styles.container}>
                <TouchableHighlight
                style={styles.button}
                onPress={this._onJoin}
                >
                    <Text> _onJoin </Text>
                </TouchableHighlight>
            </View>
        )
        {/* return( <TouchableHighlight
            accessibilityLabel =
                { t('welcomepage.accessibilityLabel.join') }
            // disabled = { buttonDisabled }
            onPress = { this._onJoin }>
        </TouchableHighlight>) */}
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor:'#0080ff'
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
})



export default translate(connect(_mapStateToProps)(App));

// AppRegistry.registerComponent("App", () => App);