export interface ChangePasswordDTO {
  userId: string;
  oldPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
}
