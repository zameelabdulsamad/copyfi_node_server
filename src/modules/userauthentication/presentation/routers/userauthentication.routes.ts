import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { Router, Request, Response } from 'express';

export default function UserAuthenticationRoutes(router:
Router, sendOtpUsecaseInterface: SendOtpUsecaseInterface): void {
  router.post('/userauthentication/sendotp', async (req: Request, res: Response) => {
    try {
      await sendOtpUsecaseInterface.execute(req.body);
      res.send({ message: 'otp sent' });
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' });
    }
  });
}
