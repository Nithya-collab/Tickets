import Seeder from "./seeder";
import { faker } from "@faker-js/faker";

class TaskSeeder extends Seeder {
    constructor(count: number = 10) {
        super(count);
        this.count = count;
        this.createData();
    }

    protected createData(): void {
        // Array(this.count).keys().forEach( (item) => {
        [...Array(this.count)].forEach( (item) => {
            this._data.push({
                name: faker.person.firstName(),
                description: faker.lorem.sentence(),
            })
        });
    }
}

export default TaskSeeder;