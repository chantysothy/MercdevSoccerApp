import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

import router from './router';
import Parse from './Parse';
import RefreshableListView from 'react-native-refreshable-listview';

import MatchRow from './MatchRow';
import MatchRowModel from './MatchRowModel';

let matches = null;
let getMatches = () => {
  return (new Parse.Query('TrainingMatch'))
    .include('stadium')
    .descending('dateTime')
    .find()
    .done(function(data){
      matches = data.map((parseObject) => {
        return new MatchRowModel(parseObject);
      });
    })
}

class MatchesScene extends Component {
  loadMatches = () => {
    return getMatches()
      .done(function(){
        this.setState({
          dataSource: this.getDataSource(matches)
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
    if(matches == null) {
      this.loadMatches();
    }
    else {
      this.setState({
        dataSource: this.getDataSource(matches)
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
          style={styles.matchList}
          loadData={this.loadMatches.bind(this)}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </Image>
    );
  }

  _renderRow = (match: object, sectionID: number, rowID: number) => {
    return (
      <TouchableHighlight onPress={() => {
        let route = router.getMatchRoute(match);
        this.props.navigator.push(route);
      }}>
        <MatchRow match={match} />
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  matchList: {
    backgroundColor: 'rgba(0,0,0,.3)'
  }
});

export default MatchesScene;