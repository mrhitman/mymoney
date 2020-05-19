import {StackScreenProps} from '@react-navigation/stack';
import {IconType} from 'common/types/icon';
import React, {PureComponent} from 'react';
import {SectionList} from 'react-native';
import UI, {Colors} from 'react-native-ui-lib';
import Icon from '../../misc/Icon';
import {getHeight, getWidth} from '../../utils/index';

interface SectionData {
  title: string;
  route?: string;
  icon: {
    type: IconType;
    name: string;
    color?: string;
  };
}

interface Section {
  data: SectionData[];
}

interface SectionProp {
  item: SectionData;
}

const Sections: Section[] = [
  {
    data: [
      {
        title: 'Categories',
        route: 'Categories',
        icon: {
          type: IconType.AntDesign,
          name: 'tagso',
        },
      },
      {
        title: 'Currencies',
        route: 'Currencies',
        icon: {
          type: IconType.Fontisto,
          name: 'money-symbol',
        },
      },
    ],
  },
  {
    data: [
      {
        title: 'Notification settings',
        icon: {
          type: IconType.Ionicons,
          name: 'ios-notifications-outline',
        },
      },
      {
        title: 'Account settings',
        route: 'AccountSettings',
        icon: {
          type: IconType.MaterialCommunityIcons,
          name: 'account',
        },
      },
      {
        title: 'Help',
        icon: {
          type: IconType.Feather,
          name: 'help-circle',
        },
      },
    ],
  },
  {
    data: [
      {
        title: 'Facebook',
        icon: {
          type: IconType.AntDesign,
          name: 'facebook-square',
          color: Colors.blue20,
        },
      },
      {
        title: 'Twitter',
        icon: {
          type: IconType.AntDesign,
          name: 'twitter',
          color: Colors.blue30,
        },
      },
      {
        title: 'VK',
        icon: {
          type: IconType.Entypo,
          name: 'vk-alternitive',
          color: Colors.blue10,
        },
      },
    ],
  },
  {
    data: [
      {
        title: 'Log out',
        icon: {
          type: IconType.MaterialCommunityIcons,
          name: 'logout',
        },
      },
    ],
  },
];

export class More extends PureComponent<StackScreenProps<{}>> {
  public render() {
    return (
      <UI.View useSafeArea>
        <UI.View>
          <UI.View padding-8 row>
            <UI.Card
              height={getHeight(20)}
              width={getWidth(45)}
              margin-8
              padding-8>
              <UI.Text>Full access</UI.Text>
            </UI.Card>
            <UI.View center flex margin-8>
              <UI.Avatar
                size={100}
                source={{
                  uri:
                    'https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png',
                }}
              />
            </UI.View>
          </UI.View>
        </UI.View>
        <SectionList
          sections={Sections}
          keyExtractor={(item, index) => item.title + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
        />
      </UI.View>
    );
  }

  protected renderHeader = () => {
    return <UI.View margin-8 marginH-16 bg-dark70 padding-3 />;
  };

  protected renderItem = (item: SectionProp) => {
    return (
      <UI.TouchableOpacity
        padding-12
        row
        onPress={() => {
          item.item.route && this.props.navigation.navigate(item.item.route);
        }}>
        <UI.View margin-8 marginR-16 center>
          <Icon
            type={item.item.icon.type}
            name={item.item.icon.name}
            color={item.item.icon.color}
            size={24}
          />
        </UI.View>
        <UI.View center>
          <UI.Text black text70R>
            {item.item.title}
          </UI.Text>
        </UI.View>
      </UI.TouchableOpacity>
    );
  };
}

export default More;
