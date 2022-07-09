export interface UpdateProfileDTO {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  username: string;
  biography: string;
  profilePublic: boolean;
  mutePostNotifications: boolean;
  muteConnectionsNotifications: boolean;
  muteMessageNotifications: boolean;
}
