"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscription = void 0;
const client_1 = require("@prisma/client");
const CreateSubscription = async (dev) => {
    if (!dev)
        return;
    const prisma = new client_1.PrismaClient();
    const listSubs = [
        {
            name: 'DEFAULT',
            limitSensei: 3,
        },
        {
            name: 'GOLD',
            limitSensei: 8,
        },
        {
            name: 'PREMIUM',
            limitSensei: 10000,
        }
    ];
    console.log(`Creando subs...`);
    try {
        listSubs.forEach(async (item, i) => {
            const test = await prisma.masterSubscriptions.findFirst({ where: { name: item.name } });
            if (test)
                return console.log(`ya creado creado ${item}`);
            await prisma.masterSubscriptions.create({ data: {
                    id: i + 1,
                    name: item.name.toLocaleUpperCase(),
                    limitSensei: item.limitSensei,
                    description: `subscription number ${i}, ${item}`
                }
            });
            console.log(`se acaba de crear ${item}`);
        });
    }
    catch (error) {
        return;
    }
    console.log(`Subs creados...`);
};
exports.CreateSubscription = CreateSubscription;
//# sourceMappingURL=subscription.fixture.js.map