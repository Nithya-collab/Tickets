import Seeder from "./seeder";

let roles = ['Admin','Organizer','Coordinator','Attendee','Audience','Vendor']

class RoleSeeder extends Seeder {
    constructor(count: number = roles.length) {
        super(count);
        this.count = count;
        this.createData();
    }

    protected createData(): void {
        roles.forEach( (item) => {
            this._data.push({
                title: item
            })
        });
    }
}

export default RoleSeeder;