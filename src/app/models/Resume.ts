import { Skills } from "./Skills";

export interface Resume {
    id: number;
    name: string;
    skills: Skills[];
    yearsOfExperience: number;
    originalFileName: string;
    filePath: string;
    address: string;
    extractedText: string;
    uploadTime: string;
    scanAllresumesIsChecked: boolean;
    email: string;
    phone: string;
    education: string;
    redFlags: string[];

}