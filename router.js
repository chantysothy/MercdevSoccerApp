import React, {
    Component,
    StyleSheet,
    View,
    ListView,
    Image,
    Text
} from 'react-native';

import MatchesScene from './MatchesScene';
import MatchScene from './MatchScene';
import PlayersScene from './PlayersScene';
import MenuToggleButton from './MenuToggleButton';

import pageNavigator from './pageNavigator';

const styles = StyleSheet.create({
  menuButton: {
    width: 40, 
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

let renderTitle = (title) => {
  return (
    <View style={{ 
      flexDirection: 'row',
      flex: 1,
      
    }}>
      <Text style={{
        fontSize: 16,
        flex: 1,
        alignSelf: 'center',
      }}>{title}</Text>
    </View>
  );
}

let renderMenuButton = () => {
  return (
    <MenuToggleButton style={styles.menuButton}>
      <Image
        source={require('./images/hamburger.png')}
        resizeMode='contain'
        style={{
          width: 40,
          opacity: .6,
          alignSelf: 'center'
        }}/>
    </MenuToggleButton>
  );
};

let YourRouter = {
  getRootRoute() {
    let matchesRoute = this.getMatchesRoute(true);
    delete matchesRoute.getSceneClass;
    matchesRoute.renderScene = (navigator) => {
      pageNavigator.init(navigator);
      return <MatchesScene navigator={navigator} />
    }
    return matchesRoute;
  },

  getMatchesRoute(doRenderMenuButton: bool) {
    let route = {
      getSceneClass() {
        return MatchesScene;
      },
      renderTitle() {
        return renderTitle('Матчи');
      }
    };

    if(doRenderMenuButton) {
      route.renderLeftButton = renderMenuButton;
    }

    return route;
  },


  getPlayersRoute(doRenderMenuButton: bool) {
    let route = {
      getSceneClass() {
        return PlayersScene;
      },
      renderTitle() {
        return renderTitle('Игроки');
      }
    };

    if(doRenderMenuButton) {
      route.renderLeftButton = renderMenuButton;
    }

    return route;
  },

  getMatchRoute(match: object) {
    return {
      renderScene(navigator) {
        return <MatchScene navigator={navigator} match={match} />;
      },
      renderTitle() {
        return renderTitle('Матч');
      }
    };
  }
};

export default YourRouter;