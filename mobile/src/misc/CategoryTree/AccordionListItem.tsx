import React, {Component} from 'react';
import UI from 'react-native-ui-lib';
import {Icon, IconType} from '../Icon';

interface AccordionListItemProps {
  expanded?: boolean;
  title: string;
  description: string;
  onPress?: () => void;
  onLongPress?: () => void;
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
}

interface AccordionListItemState {
  expanded: boolean;
}

export class AccordionListItem extends Component<
  AccordionListItemProps,
  AccordionListItemState
> {
  public state = {
    expanded: this.props.expanded || false,
  };

  public render() {
    return (
      <React.Fragment>
        <UI.TouchableOpacity key={this.props.title} row margin-8>
          <UI.View br60 bg-grey40 padding-8>
            <Icon type={IconType.AntDesign} name="wallet" size={20} />
          </UI.View>
          <UI.View centerV>
            <UI.Text marginL-16 text70R>
              {this.props.title}
            </UI.Text>
            <UI.Text marginL-16 text90L>
              {this.props.description}
            </UI.Text>
          </UI.View>
        </UI.TouchableOpacity>
        {this.state.expanded && this.props.children}
      </React.Fragment>
    );
  }
}

export default AccordionListItem;
