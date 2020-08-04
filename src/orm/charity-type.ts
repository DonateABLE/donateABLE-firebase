import { IconName } from "components/icon";
import { firestore } from "fb";
import Model from "./model";

export default class CharityType extends Model {
    public readonly collection = firestore.collection("charity-type");

    @Model.field()
    public name = "";

    @Model.field()
    public icon: IconName = "question-circle";
}
