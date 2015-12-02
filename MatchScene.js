import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    Image
} from 'react-native';

import router from './router';
import Parse from './Parse';
import RefreshableListView from 'react-native-refreshable-listview';

import MatchRow from './MatchRow';
import PlayerRow from './PlayerRow';
import PlayerRowModel from './PlayerRowModel';

let getSectionData = (dataBlob, sectionID) => {
  return dataBlob[sectionID];
}

let getRowData = (dataBlob, sectionID, rowID) => {
  return dataBlob[sectionID + ':' + rowID];
}

class MatchScene extends Component {
  
  loadMatchPlayers() {
    let parseObject = this.props.match.parseObject;

    let sectionIDs = [];
    let rowIDs = [];
    let dataBlob = [];

    return Parse.Promise.when(
      parseObject.get('greenPlayers').query().find(), 
      parseObject.get('purplePlayers').query().find()
    )
      .done(function(greenPlayers, purplePlayers){

        // ListView with Sections example:
        // http://moduscreate.com/react-native-listview-with-section-headers/
        let teams = [
          {
            id: 'green',
            name: 'Салатовые',
            players: greenPlayers.map((parseObject) => {
              return new PlayerRowModel(parseObject);
            })
          },
          {
            id: 'purple',
            name: 'Пурпурные',
            players: purplePlayers.map((parseObject) => {
              return new PlayerRowModel(parseObject);
            })
          }
        ];

        for(i = 0; i < teams.length; i++) {
          let team = teams[i];

          sectionIDs.push(team.id);
          dataBlob[team.id] = team.name;

          let players = team.players;
          rowIDs[i] = [];

          for(j = 0; j < players.length; j++) {
            player = players[j];

            rowIDs[i].push(player.id);
            dataBlob[team.id + ':' + player.id] = player;
          }
        }

        this.setState({
          dataSource: this.getDataSource(dataBlob, sectionIDs, rowIDs),
        });

      }.bind(this))
  }

  getDataSource = (dataBlob, sectionIDs, rowIDs) => {
    let ds = new ListView.DataSource({
      getSectionData: getSectionData,
      getRowData: getRowData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }

  state = {
    dataSource: this.getDataSource([]),
  }

  componentDidMount = () => {
    this.loadMatchPlayers();
  }

  render = () => {
    return (
      <Image 
        source={{uri: 'http://fcmercdev.parseapp.com/images/bg.jpg'}}
        style={{flex: 1}}
      >
        <MatchRow match={this.props.match} />
        <RefreshableListView
          style={styles.playersList}
          loadData={this.loadMatchPlayers.bind(this)}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} 
          renderSectionHeader = {this.renderSectionHeader}/>
      </Image>
    );
  }

  _renderRow = (player: object, sectionID: number, rowID: number) => {
    return (
      <PlayerRow player={player} />
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={[styles.section, sectionID == 'green' ? styles.sectionGreen : styles.sectionPurple]}>
        <Text style={[styles.sectionText, sectionID == 'green' ? styles.sectionTextGreen : styles.sectionTextPurple]}>{sectionData}</Text>
      </View>
    ); 
  }
}

let styles = StyleSheet.create({
  playersList: {
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6
  },
  sectionGreen: {
    backgroundColor: 'greenyellow',
  },
  sectionPurple: {
    backgroundColor: 'purple',
  },
  sectionTextGreen: {
    color: 'rgba(0,0,0,0.9)'
  },
  sectionTextPurple: {
    color: 'rgba(255,255,255,0.9)'
  },
});

export default MatchScene;