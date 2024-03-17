import { gql, useMutation } from "@apollo/client";
import { IUser } from "../models/User.interface";

interface ICreateUserInput {
  createUserInput: {
    email: string;
    password: string;
  };
}

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`;

export function useCreateUser() {
  return useMutation<IUser, ICreateUserInput>(CREATE_USER);
}
