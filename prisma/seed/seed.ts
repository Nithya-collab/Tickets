/**
 * ! Executing this script will delete all data in your database and seed it with 10 venue.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { copycat, faker } from "@snaplet/copycat";
import dayjs from "dayjs";

const rand = (x) => (Math.random() * x) | 0;

const main = async () => {
    const seed = await createSeedClient({
        // dryRun: true, // use dryRun for debugging and getting SQL seed queries in console
        // if connect is set to true, existing related models will be reused.
        // default - false, if connect is false, creates new related models
        // connect: true,
        models: {
            user: {
                data: {
                    userName: (ctx) => copycat.fullName(ctx.seed),
                    email: (ctx) =>
                        copycat.email(ctx.seed, { domain: "ticketx.com" }),
                    passwordHash: (ctx) => copycat.password(ctx.seed),
                    firstName: (ctx) => copycat.firstName(ctx.seed),
                    lastName: (ctx) => copycat.lastName(ctx.seed),
                    // userType: (ctx) => ['Admin', 'Organizer', 'Attendee'][(Math.random() * 3) | 0],
                    userType: (ctx) =>
                        copycat.oneOf(ctx.seed, [
                            "Admin",
                            "Organizer",
                            "Attendee",
                        ]),
                },
            },
            event: {
                data: {
                    eventName: (ctx) =>
                        copycat.words(ctx.seed, {
                            min: 3,
                            max: 7,
                            capitalize: "first",
                        }),
                    description: (ctx) => copycat.paragraph(ctx.seed),
                    startTime: (ctx) =>
                        dayjs(
                            copycat.dateString(ctx.seed, {
                                minYear: 2024,
                                maxYear: 2026,
                            })
                        ).format("YYYY-MM-DD HH:mm:ss"),
                    endTime: (ctx) =>
                        dayjs(ctx.data.startTime)
                            .add(rand(24), "hour")
                            .add(rand(7), "day")
                            .format("YYYY-MM-DD HH:mm:ss"),
                },
            },
            venue: {
                data: {
                    venueName: (ctx) => copycat.streetName(ctx.seed),
                    description: (ctx) => copycat.paragraph(ctx.seed),
                    capacity: (ctx) => ((Math.random() * 50) | 0) * 50,
                    address: (ctx) => copycat.streetAddress(ctx.seed),
                    city: (ctx) => copycat.city(ctx.seed),
                    state: (ctx) => copycat.state(ctx.seed),
                    country: (ctx) => copycat.country(ctx.seed),
                    zipCode: (ctx) => faker.location.zipCode("6#####"),
                },
            },
        },
    });

    // Truncate all tables in the database
    await seed.$resetDatabase();

    // Seed the database with 10 venue
    await seed.venue((x) => x(10));

    // seed the database with 10 users and one event each
    // note here the user type is random, so user may be organizer, attendee or admin
    await seed.user((x) => x(10, { events: [{}, {}] }));

    // create 10 events which will implicitly create 10 users ( one user for one event )
    // the users are assigned organizer type, so all 10 events belong to an organizer each
    await seed.event((x) =>
        x(10, {
            users: { userType: "Organizer" },
            eventcategories: [{}, {}], // many to many relationship: events <> categories through event_categories intermediate(pivot) table
        })
    );

    // create tickets and connect to existing related models (events, users, categories)
    // these tickets create scopes related model, since it is not created before
    await seed.ticket((x) => x({ min: 10, max: 25 }), { connect: true });

    await seed.booking((x) =>
        x({ min: 3, max: 8 }, { bookingdetails: [{}, {}], payments: [{}] })
    );

    // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

    console.log("Database seeded successfully!");

    process.exit();
};

main();
