import { authMiddlewareFactory } from '../factories/authmiddleware.factory';
import { expressMiddlewareAdapter } from './expressmiddleware.adapter';

export const authMiddleware = expressMiddlewareAdapter(authMiddlewareFactory());
