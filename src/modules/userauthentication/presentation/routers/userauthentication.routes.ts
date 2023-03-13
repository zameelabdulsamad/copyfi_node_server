import { Router } from 'express';

export default function UserAuthenticationRoutes(router: Router): void {
  router.post('/sendotp');
}
