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

    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
