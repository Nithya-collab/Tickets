import Seeder from "./seeder";

export const organizerPermissions = ['create_ticket','edit_ticket','delete_ticket','create_event','edit_event','delete_event'];
export const coordinatorPermissions = ['send_email','welcome_guest','assign_vendor','book_host','book_venue','book_catering'];
// let audiencePermissions = ['','','','',''];
export const attendeePermissions = ['buy_ticket','cancel_ticket','join_meeting','leave_meeting'];
export const vendorPermissions = ['verify_ticket','edit_ticket'];

let permissions = organizerPermissions.concat(coordinatorPermissions, attendeePermissions, vendorPermissions);

class PermissionSeeder extends Seeder {
    constructor(count: number = permissions.length) {
        super(count);
        this.count = count;
        this.createData();
    }

    protected createData(): void {
        permissions.forEach( (item) => {
            this._data.push({
                title: item
            })
        });
    }
}

export default PermissionSeeder;