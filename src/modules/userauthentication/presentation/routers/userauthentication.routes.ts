import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { Router } from 'express';
import { sendOtpFactory } from '../factories/sendotp.factory';
import { verifyOtpFactory } from '../factories/verifyotp.factory';
import { registerUserFactory } from '../factories/registeruser.factory';
import { refreshTokenFactory } from '../factories/refreshtoken.factory';

export default function UserAuthenticationRoutes(router:Router): void {
  router.post('/userauthentication/sendotp', expressRouteAdapter(sendOtpFactory()));
  router.post('/userauthentication/verifyotp', expressRouteAdapter(verifyOtpFactory()));
  router.post('/userauthentication/register', expressRouteAdapter(registerUserFactory()));
  router.post('/userauthentication/refreshtoken', expressRouteAdapter(refreshTokenFactory()));
}
