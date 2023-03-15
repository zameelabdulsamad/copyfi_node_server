import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { Router } from 'express';
import { sendOtpFactory } from '../factories/otp_factory/sendotp.factory';

export default function UserAuthenticationRoutes(router:Router): void {
  router.post('/userauthentication/sendotp', expressRouteAdapter(sendOtpFactory()));
}
