import { PrismaClient } from "@prisma/client";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import RoleSeeder from "./seeders/RoleSeeder";
import PermissionSeeder, {
    attendeePermissions,
    coordinatorPermissions,
  organizerPermissions,
} from "./seeders/PermissionSeeder";
import UserSeeder from "./seeders/UserSeeder";
import TaskSeeder from "./seeders/TaskSeeder";

export const prisma = new PrismaClient();
const main = async () => {
  try {
    // await prisma.$executeRaw`PRAGMA foreign_keys=off;`;
    await prisma.permissionRole.deleteMany();
    await prisma.roleUser.deleteMany();
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();
    // await prisma.$executeRaw`PRAGMA foreign_keys=on;`;

    const roles = new RoleSeeder();
    const permissions = new PermissionSeeder();
    const users = new UserSeeder();
    const tasks = new TaskSeeder(3);

    for (const role of roles.data) {
      let rolen = await prisma.role.create({
        data: role,
      });
      // console.log(rolen.id);
    }

    for (const permission of permissions.data) {
      await prisma.permission.create({
        data: permission,
      });
    }

    let organizerRole = await prisma.role.findFirst({
      where: {
        title: "Organizer",
      },
    });
    organizerPermissions.forEach(async (perm) => {
      let organizerPermission = await prisma.permission.findFirst({
        where: {
          title: perm,
        },
      });
      if (organizerRole != null && organizerPermission != null) {
        await prisma.permissionRole.create({
          data: {
            role_id: organizerRole.id,
            permission_id: organizerPermission.id,
          },
        });
      }
    });

    let coordinatorRole = await prisma.role.findFirst({
        where: {
          title: "Coordinator",
        },
      });
      coordinatorPermissions.forEach(async (perm) => {
        let coordinatorPermission = await prisma.permission.findFirst({
          where: {
            title: perm,
          },
        });
        if (coordinatorRole != null && coordinatorPermission != null) {
          await prisma.permissionRole.create({
            data: {
              role_id: coordinatorRole.id,
              permission_id: coordinatorPermission.id,
            },
          });
        }
      });

      let attendeeRole = await prisma.role.findFirst({
        where: {
          title: "Attendee",
        },
      });
      attendeePermissions.forEach(async (perm) => {
        let attendeePermission = await prisma.permission.findFirst({
          where: {
            title: perm,
          },
        });
        if (attendeeRole != null && attendeePermission != null) {
          await prisma.permissionRole.create({
            data: {
              role_id: attendeeRole.id,
              permission_id: attendeePermission.id,
            },
          });
        }
      });

    for (const user of users.data) {
      // newly created user
      let usern = await prisma.user.create({
        data: {
          ...(user as any),
          tasks: {
            create: tasks.data,
          },
        },
      });
      let roleCount = await prisma.role.count();
      let randomRole = await prisma.role.findMany({
        skip: Math.floor(Math.random() * roleCount),
        take: 1,
      });
      await prisma.roleUser.create({
        data: {
          user_id: usern.id,
          role_id: randomRole[0].id,
        },
      });
    }
  } catch (e) {
    throw error;
  }
};

main()
  .then(async () => {
    console.log("see your seed data in db");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log("finished seeding");
    await prisma.$disconnect();
  });
