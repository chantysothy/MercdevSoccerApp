import React, {
    Component,
    Platform
} from 'react-native';

import router from './router';
import ExNavigator from '@exponent/react-native-navigator';
import SlideMenu from 'react-native-side-menu'; 
import Menu from './Menu';

export default class Example extends Component {

  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      touchToClose: false,
    };
  }

  handleChange(isOpen) {
    if (!isOpen) {
      this.setState({
        touchToClose: false,
      });
    }
  }

  render = () => {
    return (
      
      <SlideMenu 
        menu={<Menu />}
        touchToClose={true}
        onChange={this.handleChange.bind(this)}
        // https://github.com/react-native-fellowship/react-native-side-menu/issues/118
        animationStyle={(value) => ({left : value})}
      >
        <ExNavigator
          initialRoute={router.getRootRoute()}
          style={{ flex: 1 }}
          sceneStyle={{ paddingTop: Platform.OS === 'ios' ? 64 : 56 }} />
      </SlideMenu>
    )
  }
}