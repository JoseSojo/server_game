
import { PrismaClient } from "@prisma/client";

// 

export const CreateSubscription = async (dev: any) => {
    if(!dev) return;

    const prisma = new PrismaClient();
    const listSubs = [
        {
            name:'DEFAULT',
            limitSensei: 3,
            
        }, 
        {
            name:'GOLD',
            limitSensei: 8,
            
        }, 
        {
            name:'PREMIUM',
            limitSensei: 10000,
            
        }];

    /**
     * DEFAULT
     * @description: anuncion, solo 3 sensei, sin limite de preguntas
     * 
     * GOLD
     * @description: anuncions, +1 sensei for deposito, pagar para aumentar coin, sin limite de preguntas
     * 
     * PREMIUM:
     * @description: sin limites de sensei, +100 coin por día, sin limite de preguntas
     */

    console.log(`Creando subs...`);
    try {
        listSubs.forEach(async (item, i) => {
            const test = await prisma.masterSubscriptions.findFirst({ where:{name:item.name} });
            if(test) return console.log(`ya creado creado ${item}`);
            await prisma.masterSubscriptions.create({data: {
                id: i+1, 
                name: item.name.toLocaleUpperCase(), 
                limitSensei: item.limitSensei,
                description: `subscription number ${i}, ${item}` 
            }
        });
            console.log(`se acaba de crear ${item}`);
        });
    } catch (error) {
        return;
    }
    console.log(`Subs creados...`);

} 
