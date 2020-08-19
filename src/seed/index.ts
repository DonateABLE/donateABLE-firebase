import Charity from "orm/charity";
import CharityType from "orm/charity-type";
import Model, { StaticModel } from "orm/model";
import User from "orm/user";
import charityTypes from "./charity-type.json";
import charities from "./charity.json";
import users from "./user.json";

async function seed(items: any[], model: StaticModel<Model>): Promise<void> {
    if ((await (model as any).builder().limit(1).get()).length > 0) {
        return;
    }

    // tslint:disable-next-line: no-console
    console.log("seeding " + model.name);

    for (const charity of items) {
        const c = new model();
        for (const [key, value] of Object.entries(charity)) {
            (c as any)[key] = value;
            console.log("\n" + c + "\n" + "key: " + key + ", value: " + value);
        }
        await c.save();
    }
}
export async function seedCharities(): Promise<void> {
    await seed(charities, Charity);
}

export async function seedCharityTypes(): Promise<void> {
    await seed(charityTypes, CharityType);
}
export async function seedUser(): Promise<void> {
    await seed(users, User);
}
