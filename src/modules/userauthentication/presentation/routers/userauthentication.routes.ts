import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { Router } from 'express';
import { sendOtpFactory } from '../factories/otp_factory/sendotp.factory';
import { verifyOtpFactory } from '../factories/otp_factory/verifyotp.factory';
import { registerUserFactory } from '../factories/registeruser_factory/registeruser.factory';

export default function UserAuthenticationRoutes(router:Router): void {
  router.post('/userauthentication/sendotp', expressRouteAdapter(sendOtpFactory()));
  router.post('/userauthentication/verifyotp', expressRouteAdapter(verifyOtpFactory()));
  router.post('/userauthentication/register', expressRouteAdapter(registerUserFactory()));
}
