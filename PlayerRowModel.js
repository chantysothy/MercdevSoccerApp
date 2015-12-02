class PlayerRowModel {
  constructor(parseObject) {
    let photo = parseObject.get('photo');
    let averageRating = parseObject.get('rating') / parseObject.get('totalMatches');

    Object.assign(this, {
      id: parseObject.id,
      photoUrl: photo && photo.url() || 'http://fcmercdev.parseapp.com/images/default-user.png',
      fullName: parseObject.get('firstName') + ' ' + parseObject.get('lastName'),
      rating: isNaN(averageRating) ? 'нет' : averageRating.toFixed(2) * 100
    });
  }
}

export default PlayerRowModel;