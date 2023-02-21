import { Response, Request, request } from "express";
import { iCreateUserRequestBody } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";
import { getAllUsersServices } from "../services/users/getAllUsers.services";
import { getUsersLoggedServices } from "../services/users/getUsersLogged.services";
import { updateUsersServices } from "../services/users/updateUser.services";
import { deleteUserServices } from "../services/users/deleteUser.services";
import { activeUserServices } from "../services/users/activeUser.services"
const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const createUserRequestBody: iCreateUserRequestBody = request.body;
  const newUser = await createUserService(createUserRequestBody);
  return response.status(201).json(newUser);
};

const getUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let result = await getAllUsersServices(request);
  return response.status(200).json(result);
};

const getUserLoggedController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let result = await getUsersLoggedServices(request);
  return response.status(200).json(result);
};

const updateUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let result = await updateUsersServices(request);
  return response.status(201).json(result);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let result = await deleteUserServices(request);
  return response.status(200).json(result);
};

const activeUserController = async(request : Request , response : Response): Promise<Response> =>{

  let result = await activeUserServices(request)
  return response.status(200).json(result)
    
  
}

export {
  createUsersController,
  getUserController,
  getUserLoggedController,
  updateUsersController,
  deleteUserController,
  activeUserController
};
