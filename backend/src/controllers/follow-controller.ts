import { NextFunction, Request, Response } from 'express';

function followersByUser(req: Request, res: Response, next: NextFunction) {}

function followingByUser(req: Request, res: Response, next: NextFunction) {}

export { followersByUser, followingByUser };
