export default class TrainingDetails {
  constructor(json) {
    this.id = json.id;
    this.trainingOwner = json.user;
    this.address = json.address;
    this.createdOn = json.created;
    this.description = json.description;
    this.discipline = json.discipline;
    this.distance = json.distance;
    this.fromDate = json.start_date;
    this.joined = json.isParticipate === 1;
    this.photo = json.photo;
    this.photoCover = json.photo_cover;
    this.private = json.private;
    this.title = json.name;
    this.url = json.url;
    this.latitude = json.lat;
    this.longitude = json.lng;
    this.nbParticipant = json.training_user_count;
    this.participants = [];

    json.training_users.forEach((elem) => {
      this.participants.push(elem.user);
    });

    this.distanceFromUser = json.distanceFromUser;
    this.canJoin = true;
  }
}
