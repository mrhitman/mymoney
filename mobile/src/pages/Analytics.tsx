import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import UI from 'react-native-ui-lib';
import Header from '../misc/Header';
import Icon, {IconType} from '../misc/Icon';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

export class Analytics extends PureComponent {
  public state = {
    user: null,
    isSigninInProgress: false,
  };

  public isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({isSigninInProgress: !isSignedIn});
  };

  public getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({user: currentUser});
  };

  public signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({user: userInfo});
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    console.log(this.state);
  };

  public signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  public revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  public getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  render() {
    return (
      <UI.View useSafeArea>
        <Header
          size="lg"
          renderLeft={() => (
            <UI.View margin-10>
              <UI.Text text60BO>Analitics</UI.Text>
            </UI.View>
          )}
          renderRight={() => (
            <UI.View margin-10>
              <Icon type={IconType.Ionicons} name="ios-settings" size={28} />
            </UI.View>
          )}
        />
        <FlatList
          renderItem={({item}) => (
            <UI.View key={item.id} marginL-6>
              <UI.View row>
                <UI.View centerV margin-10>
                  <Icon type={item.icon.type} name={item.icon.name} size={40} />
                </UI.View>
                <UI.View centerV marginL-16>
                  <UI.Text text70R>{item.name}</UI.Text>
                </UI.View>
              </UI.View>
            </UI.View>
          )}
          data={[
            {
              id: 1,
              name: 'Budget',
              icon: {name: 'dollar-bill', type: IconType.Foundation},
            },
            {
              id: 2,
              name: 'Outcomes by categories',
              icon: {name: 'dollar-bill', type: IconType.Foundation},
            },
            {
              id: 3,
              name: 'Incomes by categories',
              icon: {name: 'dollar-bill', type: IconType.Foundation},
            },
            {
              id: 4,
              name: 'Spends trend',
              icon: {name: 'barchart', type: IconType.AntDesign},
            },
            {
              id: 5,
              name: 'Money movings',
              icon: {name: 'dollar-bill', type: IconType.Foundation},
            },
          ]}
        />
        <UI.Text> textInComponent </UI.Text>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
          disabled={this.state.isSigninInProgress}
        />
      </UI.View>
    );
  }
}

export default Analytics;
