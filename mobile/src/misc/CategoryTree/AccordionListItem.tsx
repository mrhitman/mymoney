import React, {Component} from 'react';
import UI from 'react-native-ui-lib';

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
        <UI.TouchableOpacity
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}>
          <UI.View>
            <UI.Text>{this.props.title}</UI.Text>
            <UI.Text>{this.props.description}</UI.Text>
          </UI.View>
        </UI.TouchableOpacity>
        {this.state.expanded && this.props.children}
      </React.Fragment>
    );
  }
}

export default AccordionListItem;
