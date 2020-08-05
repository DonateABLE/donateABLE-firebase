import { IconName } from "components/icon";
import { firestore } from "fb";
import Model, { useQuery } from "./model";

export interface DonationTarget {
    name: string;
    cost: number;
    description: string;
    icon: IconName;
}

export default class User extends Model {
    public readonly collection = firestore.collection("user");

    // User Info
    @Model.field()
    public firstName = "";

    @Model.field()
    public lastName = "";

    @Model.field()
    public user = "";

    @Model.field()
    public email = "";

    @Model.field()
    public portrait: string | undefined;

    @Model.field()
    public getEmails = false;

    // Hashes
    @Model.field()
    public ghsHashes = 0;

    @Model.field()
    public wsvHashes = 0;

    @Model.field()
    public donateableHashes = 0;

    @Model.field()
    public totalHashes = 0;

    // Time
    @Model.field()
    public ghsTime = 0;

    @Model.field()
    public wsvTime = 0;

    @Model.field()
    public donateableTime = 0;

    @Model.field()
    public totalTime = 0;

    @Model.field()
    public totalCharities = 0;

    // Methods
    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
