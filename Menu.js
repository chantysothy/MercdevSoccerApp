const React = require('react-native');
const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  TouchableHighlight
} = React;

const window = Dimensions.get('window');

import router from './router';
import pageNavigator from './pageNavigator';
import MenuToggleButton from './MenuToggleButton';

class Menu extends Component {
  render() {
    return (
      <ScrollView style={styles.menu}>
        <MenuToggleButton
          style={styles.item}
          onPress={() => {
            pageNavigator.open(router.getMatchesRoute(true));
          }}
        >
          <Text style={styles.itemText}>МАТЧИ</Text>
        </MenuToggleButton>
        <View style={styles.separator} />
        <MenuToggleButton
          style={styles.item}
          onPress={() => {
            pageNavigator.open(router.getPlayersRoute(true));
          }}
        >
          <Text style={styles.itemText}>ИГРОКИ</Text>
        </MenuToggleButton>
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 15,
  },
  item: {
    height: 40,
    flex: 1, 
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#fff'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)'
  }
});

export default Menu;