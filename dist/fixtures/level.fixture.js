"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLevels = void 0;
const client_1 = require("@prisma/client");
const CreateLevels = (dev) => {
    if (!dev)
        return;
    const prisma = new client_1.PrismaClient();
    const listLevels = ['Stone', 'Bronze', 'Copper', 'Silver', 'Gold', 'Gem', 'Garnet', 'Topaz', 'Ruby', 'Samir', 'Emerald', 'Pearl', 'Diamond'];
    console.log(`Creando levels...`);
    try {
        listLevels.forEach(async (item, i) => {
            const test = await prisma.masterLevels.findFirst({ where: { name: item } });
            if (test)
                return console.log(`ya creado creado ${item}`);
            await prisma.masterLevels.create({ data: { id: i + 1, name: item.toUpperCase(), description: `level number ${i}` } });
            console.log(`se acaba de crear ${item}`);
        });
    }
    catch (error) {
        return;
    }
    console.log(`Levels creados...`);
};
exports.CreateLevels = CreateLevels;
//# sourceMappingURL=level.fixture.js.map