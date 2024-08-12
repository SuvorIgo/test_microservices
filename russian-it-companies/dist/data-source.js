"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var it_company_entity_1 = require("./entities/it-company.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "russian-it-companies_db",
    synchronize: true,
    logging: false,
    entities: [it_company_entity_1.ItCompany],
    migrations: ['dist/migration/*.{js,ts}']
});
//# sourceMappingURL=data-source.js.map