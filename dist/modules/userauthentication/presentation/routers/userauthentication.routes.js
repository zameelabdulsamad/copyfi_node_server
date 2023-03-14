"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function UserAuthenticationRoutes(router, sendOtpUsecaseInterface) {
    router.post('/userauthentication/sendotp', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield sendOtpUsecaseInterface.execute(req.body);
            res.send({ message: 'otp sent' });
        }
        catch (err) {
            res.status(500).send({ message: 'Error fetching data' });
        }
    }));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map