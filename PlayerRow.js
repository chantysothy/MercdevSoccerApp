import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

class PlayerRow extends Component {

  // http://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps (nativeProps) {
    this._root && this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View style={styles.player}>
        <View style={styles.photo}>
          <Image 
            source={{uri: this.props.player.photoUrl}} 
            style={styles.photoImage} 
            resizeMode='cover' />
        </View>
        <View style={styles.info}>
          <Text style={styles.fullName}>
            {this.props.player.fullName}
          </Text>
          <Text style={styles.rating}>
            рейтинг: {this.props.player.rating}
          </Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  player: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
  },
  photo: {
    width: 80
  },
  photoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  fullName: {
    fontSize: 16,
    color: '#fff'
  },
  rating: {
    fontSize: 12,
    color: '#fcfcfc'
  },
});

export default PlayerRow;