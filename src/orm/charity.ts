import { IconName } from "components/icon";
import { firestore } from "fb";
import Model from "./model";

export interface DonationTarget {
    name: string;
    cost: number;
    description: string;
    icon: IconName;
}

export default class Charity extends Model {
    public readonly collection = firestore.collection("charity");

    @Model.field()
    public shortName = "";

    @Model.field()
    public longName = "";

    @Model.field()
    public logo = "";

    @Model.field()
    public shortDesc = "";

    @Model.field()
    public longDesc = "";

    @Model.field()
    public tagline = "";

    @Model.field()
    public facebookUrl = "";

    @Model.field()
    public twitterUrl = "";

    @Model.field()
    public websiteUrl = "";

    @Model.field()
    public canadaHelpsUrl = "";

    @Model.field()
    public siteKey = "";

    @Model.field()
    public comingSoon = false;

    @Model.field()
    public currentlyDonating = 0;

    @Model.field()
    public donatorsToDate = 0;

    @Model.field()
    public totalHashes = 0;

    @Model.field()
    public totalTime = 0;

    @Model.field()
    public type:
        | {
              id: string;
              name: string;
              icon: IconName;
          }
        | undefined;

    @Model.field()
    public registeredBusinessName = "";

    @Model.field()
    public businessNumber = "";

    @Model.field()
    public address = "";

    @Model.field()
    public cityProvince = "";

    @Model.field()
    public postalCode = "";

    @Model.field()
    public phone = "";

    @Model.field()
    public email = "";

    @Model.field()
    public fax = "";

    @Model.field()
    public officeHourDays = "";

    @Model.field()
    public officeHourHours = "";

    @Model.field()
    public donationTargets: DonationTarget[] = [];
}
