import { CreateLevels } from "./level.fixture";
import { CreateSubscription } from "./subscription.fixture";
import { CreateUser } from "./user.fixture";

async function main() {

    setTimeout(async () => {
        await CreateSubscription(process.env.DEV);
    }, 2000)

    setTimeout(async () => {
        await CreateLevels(process.env.DEV);
    }, 2000)

    setTimeout(async () => {
        await CreateUser(process.env.DEV);
    }, 2000)

    await CreateUser(true);
}

main()
