import { Education } from "./Education";

export interface EditResumeDeatilsDto {
        id: number;
       name:string;
       email: string;
       address:string;
       education: Education[];
       yearsOfExperience: number;
}
   