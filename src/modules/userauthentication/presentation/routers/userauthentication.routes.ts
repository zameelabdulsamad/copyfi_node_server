import { authMiddleware } from '@main/shared/adapters/authmiddleware.adapter';
import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { Router } from 'express';
import { loginUserFactory } from '../factories/loginuser_factory/loginuser.factory';
import { sendOtpFactory } from '../factories/otp_factory/sendotp.factory';
import { verifyOtpFactory } from '../factories/otp_factory/verifyotp.factory';
import { registerUserFactory } from '../factories/registeruser_factory/registeruser.factory';

export default function UserAuthenticationRoutes(router:Router): void {
  router.post('/userauthentication/sendotp', expressRouteAdapter(sendOtpFactory()));
  router.post('/userauthentication/verifyotp', expressRouteAdapter(verifyOtpFactory()));
  router.post('/userauthentication/register', authMiddleware, expressRouteAdapter(registerUserFactory()));
  router.post('/userauthentication/login', expressRouteAdapter(loginUserFactory()));
}
