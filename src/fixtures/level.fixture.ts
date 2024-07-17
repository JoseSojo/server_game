
import { PrismaClient } from "@prisma/client";

// 

export const CreateLevels = (dev: any) => {
    if(!dev) return;

    const prisma = new PrismaClient();
    const listLevels = ['Stone', 'Bronze', 'Copper', 'Silver', 'Gold', 'Gem', 'Garnet', 'Topaz', 'Ruby', 'Samir', 'Emerald', 'Pearl', 'Diamond']

    console.log(`Creando levels...`);
    try {
        listLevels.forEach(async (item, i) => {
            const test = await prisma.masterLevels.findFirst({ where:{name:item} });
            if(test) return console.log(`ya creado creado ${item}`);
            await prisma.masterLevels.create({data: { id: i+1, name: item.toUpperCase(), description: `level number ${i}` }});
            console.log(`se acaba de crear ${item}`);
        });
    } catch (error) {
        return;
    }
    console.log(`Levels creados...`);

} 
