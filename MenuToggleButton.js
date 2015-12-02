
import React, {
  Text,
  Component,
  TouchableOpacity
} from 'react-native';


class MenuToggleButton extends Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.handlePress.bind(this)}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

/**
 * This part is very important. Without it you wouldn't be able to access `menuActions`
 * @type {Object}
 */
MenuToggleButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

export default MenuToggleButton;