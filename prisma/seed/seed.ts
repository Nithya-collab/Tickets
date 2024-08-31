/**
 * ! Executing this script will delete all data in your database and seed it with 10 venue.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { copycat, faker } from "@snaplet/copycat";

const main = async () => {
  const seed = await createSeedClient({
    models: {
      user: {
        data: {
          userName: (ctx) => copycat.fullName(ctx.seed) ,
          email: (ctx) => copycat.email(ctx.seed, { domain: "ticketx.com" }),
          passwordHash: (ctx) => copycat.password(ctx.seed),
          firstName: (ctx) => copycat.firstName(ctx.seed) ,
          lastName: (ctx) => copycat.lastName(ctx.seed) ,
          // userType: (ctx) => ['Admin', 'Organizer', 'Attendee'][(Math.random() * 3) | 0],
          userType: (ctx) => copycat.oneOf(ctx.seed, ['Admin', 'Organizer', 'Attendee']),
        },
      },
      venue: {
        data: {
          venueName: (ctx) => copycat.streetName(ctx.seed),
          description: (ctx) => copycat.paragraph(ctx.seed),
          capacity: (ctx) => (Math.random()*50 | 0),
          address: (ctx) => copycat.streetAddress(ctx.seed),
          city: (ctx) => copycat.city(ctx.seed),
          state: (ctx) => copycat.state(ctx.seed),
          country: (ctx) => copycat.country(ctx.seed),
          zipCode: (ctx) => faker.location.zipCode('6#####')
        }
      }
    },
  });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 venue
  await seed.venue((x) => x(10));
  
  // seed the database with 10 users
  await seed.user((x) => x(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();