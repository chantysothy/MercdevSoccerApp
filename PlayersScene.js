import React, {
    Component,
    StyleSheet,
    View,
    ListView,
    Image,
    Text
} from 'react-native';

import RefreshableListView from 'react-native-refreshable-listview';

import Parse from './Parse';
import PlayerRow from './PlayerRow';
import PlayerRowModel from './PlayerRowModel';

let players = null;
let getPlayers = () => {
  return (new Parse.Query('Player'))
    .find()
    .done(function(data){
      players = data.map((parseObject) => {
        return new PlayerRowModel(parseObject);
      });
    });
}

class PlayersScene extends Component {
  loadPlayers = () => {
    return getPlayers()
      .done(function(){
        this.setState({
          dataSource: this.getDataSource(players)
        });
      }.bind(this))
  }

  getDataSource = (data) => {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return ds.cloneWithRows(data);
  }

  state = {
    dataSource: this.getDataSource([]),
  }

  componentDidMount = () => {
    if(players == null) {
      this.loadPlayers();
    }
    else {
      this.setState({
        dataSource: this.getDataSource(players)
      });  
    }
  }

  render = () => {
    return (
      <Image 
        source={{uri: 'http://fcmercdev.parseapp.com/images/bg.jpg'}}
        style={{flex: 1}}
      >
        <RefreshableListView
          style={styles.playersList}
          loadData={this.loadPlayers.bind(this)}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </Image>
    );
  }

  _renderRow = (player: object) => {
    return (
      <PlayerRow player={player} />
    );
  }
}

let styles = StyleSheet.create({
  playersList: {
    backgroundColor: 'rgba(0,0,0,.3)'
  }
});

export default PlayersScene;