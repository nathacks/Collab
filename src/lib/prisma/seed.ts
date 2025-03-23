import { PermissionTag, PrismaClient } from '@prisma/client';
import path from 'node:path';
import fs from 'node:fs';

const prisma = new PrismaClient();

const dataDir = path.join(process.cwd(), `${process.env.FOLDER_DATA}`);

if (!fs.existsSync(dataDir) && process.env.NODE_ENV !== 'production') {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Folder ${process.env.FOLDER_DATA} created !`);
}

enum BaseRole {
    GUEST, // Lecture
    MEMBER, // Lecture - Ecriture
    ADMIN, // Lecture - Ecriture - Settings Workspace
    OWNER // All
}

const rolePermissions = [
    { roleId: BaseRole.ADMIN, permissionTag: PermissionTag.READ },
    { roleId: BaseRole.ADMIN, permissionTag: PermissionTag.WRITE },
    { roleId: BaseRole.ADMIN, permissionTag: PermissionTag.INVITE },
    { roleId: BaseRole.MEMBER, permissionTag: PermissionTag.READ },
    { roleId: BaseRole.MEMBER, permissionTag: PermissionTag.WRITE },
    { roleId: BaseRole.GUEST, permissionTag: PermissionTag.READ },
];

async function main() {
    const rolesArray = Object.values(BaseRole).filter((role) => typeof role === 'string') as string[];

    for (const [index, roleName] of rolesArray.entries()) {
        await prisma.role.upsert({
            where: { id: index },
            update: {},
            create: { id: index, name: roleName },
        });
    }

    const permissionTags = Object.values(PermissionTag);

    for (const tag of permissionTags) {
        await prisma.permission.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
        });
    }

    for (const { roleId, permissionTag } of rolePermissions) {
        await prisma.rolePermission.upsert({
            where: {
                id: {
                    roleId,
                    permissionTag,
                },
            },
            update: {},
            create: {
                roleId,
                permissionTag,
            },
        });
    }

    console.log('Roles and permissions added!');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
