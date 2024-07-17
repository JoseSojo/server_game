"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const CreateUser = async (dev) => {
    if (!dev)
        return;
    const prisma = new client_1.PrismaClient();
    const free = await prisma.masterSubscriptions.findFirst({ where: { name: `FREE` } });
    const stone = await prisma.masterLevels.findFirst({ where: { name: `STONE` } });
    if (!free)
        return;
    if (!stone)
        return;
    console.log(`Creando admin...`);
    try {
        await prisma.user.create({
            data: {
                email: `superadmin@example.com`,
                lastname: `IA`,
                name: `ADMIN`,
                password: await bcrypt.hash(`abc.12345`, 11),
                username: `adminia`,
                levelId: stone.id,
                subscriptionId: free.id,
                rol: `ADMIN`,
            }
        });
    }
    catch (error) {
        return;
    }
    console.log(`Admin creado...`);
};
exports.CreateUser = CreateUser;
//# sourceMappingURL=user.fixture.js.map