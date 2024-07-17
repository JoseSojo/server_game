"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level_fixture_1 = require("./level.fixture");
const subscription_fixture_1 = require("./subscription.fixture");
const user_fixture_1 = require("./user.fixture");
(0, subscription_fixture_1.CreateSubscription)(process.env.DEV);
(0, level_fixture_1.CreateLevels)(process.env.DEV);
(0, user_fixture_1.CreateUser)(true);
//# sourceMappingURL=index.fixtures.js.map