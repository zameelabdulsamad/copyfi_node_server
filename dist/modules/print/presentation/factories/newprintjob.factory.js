"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPrintJobFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const newprintjob_controller_1 = require("../controllers/newprintjob.controller");
const newPrintJobFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('PRINTJOB_FILE'),
    ], 'files');
    const useCase = inversify_config_1.sl.get('NewPrintJobUsecaseInterface');
    return new newprintjob_controller_1.NewPrintJobController(validation, useCase);
};
exports.newPrintJobFactory = newPrintJobFactory;
//# sourceMappingURL=newprintjob.factory.js.map