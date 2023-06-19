import { NextFunction, Request, Response } from 'express';

function all(req: Request, res: Response, next: NextFunction) {}

function findOne(req: Request, res: Response, next: NextFunction) {}

function create(req: Request, res: Response, next: NextFunction) {}

function update(req: Request, res: Response, next: NextFunction) {}

export { all, findOne, create, update };
