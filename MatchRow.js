import React, {
    Component,
    StyleSheet,
    View,
    Text
} from 'react-native';

class MatchRow extends Component {

  // http://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps (nativeProps) {
    this._root && this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View style={styles.match}>
        <View style={styles.teams}>
          <View style={styles.teamGreen} />
          <View style={styles.score}>
            <Text style={styles.matchDate}>
              {this.props.match.dateTime}
            </Text>
            <Text style={styles.scoreValue}>
              {this.props.match.score}
            </Text>
          </View>
          <View style={styles.teamPurple} />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  matchDate: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff'
  },
  match: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'transparent'
  },
  teams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 60,
  },
  teamGreen: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: 'greenyellow'
  },
  teamPurple: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: 'purple'
  },
  score: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreValue: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },
});

export default MatchRow;