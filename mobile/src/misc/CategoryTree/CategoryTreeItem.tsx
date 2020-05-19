import {Category} from 'common/category';
import {IconType} from 'common/types/icon';
import {observer} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {Component} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';
import UI from 'react-native-ui-lib';
import {getWidth} from '../../utils/index';
import {CategoryIcon} from '../CategoryIcon';
import {Icon} from '../Icon';

interface CategoryTreeItemProps extends WithTranslation {
  expanded?: boolean;
  category: Instance<typeof Category>;
  deep: number;
  onPress?: () => void;
  onLongPress?: () => void;
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
}

interface CategoryTreeItemState {
  expanded: boolean;
}

export class CategoryTreeItem extends Component<
  CategoryTreeItemProps,
  CategoryTreeItemState
> {
  public state = {
    expanded: this.props.expanded || false,
  };

  public render() {
    const {category} = this.props;
    return (
      <React.Fragment>
        <UI.TouchableOpacity
          key={category.id}
          row
          margin-8
          onPress={() => this.setState({expanded: !this.state.expanded})}>
          <CategoryIcon
            category={category}
            style={{
              backgroundColor: category.icon.backgroundColor,
              marginLeft: this.getLeftOffset(),
            }}
          />
          <UI.View centerV>
            <UI.Text marginL-16 text70R>
              {this.props.t(category.name)}
            </UI.Text>
            <UI.Text marginL-16 text90L>
              {this.props.t(category.type)}
            </UI.Text>
          </UI.View>
          <UI.View absR margin-8>
            <Icon
              type={IconType.AntDesign}
              name={this.state.expanded ? 'arrowdown' : 'arrowright'}
            />
          </UI.View>
        </UI.TouchableOpacity>
        {this.state.expanded && this.props.children}
      </React.Fragment>
    );
  }

  protected getLeftOffset() {
    return getWidth(5) * this.props.deep + 8;
  }
}

export default observer(withTranslation()(CategoryTreeItem));
