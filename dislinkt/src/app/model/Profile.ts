import { Experience } from "./Experience";
import { Interest } from "./Interest";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  username: string;
  biography: string;
  experiences: Experience[];
  interests: Interest[];
}
