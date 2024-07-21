"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level_fixture_1 = require("./level.fixture");
const subscription_fixture_1 = require("./subscription.fixture");
const user_fixture_1 = require("./user.fixture");
async function main() {
    setTimeout(async () => {
        await (0, subscription_fixture_1.CreateSubscription)(process.env.DEV);
    }, 2000);
    setTimeout(async () => {
        await (0, level_fixture_1.CreateLevels)(process.env.DEV);
    }, 2000);
    setTimeout(async () => {
        await (0, user_fixture_1.CreateUser)(process.env.DEV);
    }, 2000);
    await (0, user_fixture_1.CreateUser)(true);
}
main();
//# sourceMappingURL=index.fixtures.js.map