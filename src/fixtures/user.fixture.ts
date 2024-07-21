
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

// 

export const CreateUser = async (dev: any) => {
    if(!dev) return;

    const prisma = new PrismaClient();

    const free = await prisma.masterSubscriptions.findFirst({ where:{ name:`DEFAULT` } }) 
    const stone = await prisma.masterLevels.findFirst({ where:{ name:`STONE` } })

    if(!free) return;
    if(!stone) return;

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
        })

    } catch (error) {
        return;
    }
    console.log(`Admin creado...`);

} 
