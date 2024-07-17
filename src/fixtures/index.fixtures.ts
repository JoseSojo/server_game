import { CreateLevels } from "./level.fixture";
import { CreateSubscription } from "./subscription.fixture";
import { CreateUser } from "./user.fixture";

CreateSubscription(process.env.DEV);
CreateLevels(process.env.DEV);
CreateUser(true);
