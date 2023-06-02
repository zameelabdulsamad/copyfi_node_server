"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintJobDataModelEntity = void 0;
const typeorm_1 = require("typeorm");
const user_datamodelentity_1 = require("./user.datamodelentity");
let PrintJobDataModelEntity = class PrintJobDataModelEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PrintJobDataModelEntity.prototype, "PRINTJOB_UID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        nullable: false,
    }),
    __metadata("design:type", Date)
], PrintJobDataModelEntity.prototype, "PRINTJOB_TIME", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        nullable: false,
    }),
    __metadata("design:type", Array)
], PrintJobDataModelEntity.prototype, "PRINTJOB_FILE", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_datamodelentity_1.UserDataModelEntity, (PRINTJOB_USER) => PRINTJOB_USER.USER_PRINTJOB, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_datamodelentity_1.UserDataModelEntity)
], PrintJobDataModelEntity.prototype, "PRINTJOB_USER", void 0);
PrintJobDataModelEntity = __decorate([
    (0, typeorm_1.Entity)('PRINTJOB')
], PrintJobDataModelEntity);
exports.PrintJobDataModelEntity = PrintJobDataModelEntity;
//# sourceMappingURL=printjob.datamodelentity.js.map