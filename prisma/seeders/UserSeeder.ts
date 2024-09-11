import { Bcrypt } from "oslo/password";
import Seeder from "./seeder";
import { faker } from "@faker-js/faker";
import { randomBytes } from "crypto";

const bcrypt = new Bcrypt();
class UserSeeder extends Seeder {
    constructor(count: number = 10) {
        super(count);
        this.count = count;
        this.createData();
    }

    protected async createData(): Promise<void> {
        let pwHash = await bcrypt.hash("password");
        // Array(this.count).keys().forEach( (item) => {
        [...Array(this.count)].forEach( (item) => {
            this._data.push({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: pwHash,
                remember_token: randomBytes(7).toString("base64").slice(0,10)
            })
        });
    }
}

export default UserSeeder;