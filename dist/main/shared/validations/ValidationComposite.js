"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationComposite = void 0;
class ValidationComposite {
    constructor(validations, segment) {
        this.validations = validations;
        this.segment = segment;
    }
    validate(request) {
        const input = request[this.segment];
        return this.validations.reduce((error, validation) => error || validation.validate(input), null);
    }
}
exports.ValidationComposite = ValidationComposite;
//# sourceMappingURL=ValidationComposite.js.map