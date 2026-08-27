import { NextFunction, Request, Response } from 'express';
import { usersService } from '../services/users.service.js';
import { buildResponse } from '../utils/api-response.js';

export const usersController = {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await usersService.getAllUsers();
      res.status(200).json(buildResponse(true, 'Users retrieved successfully', users));
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await usersService.getUserById(id);
      res.status(200).json(buildResponse(true, 'User retrieved successfully', user));
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.createUser(req.body);
      res.status(201).json(buildResponse(true, 'User created successfully', user));
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await usersService.updateUser(id, req.body);
      res.status(200).json(buildResponse(true, 'User updated successfully', user));
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await usersService.deleteUser(id);
      res.status(200).json(buildResponse(true, 'User deleted successfully', user));
    } catch (error) {
      next(error);
    }
  },
};
