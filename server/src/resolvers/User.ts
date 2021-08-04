import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/validation";
import { hashingSalts } from "../constants";

@ObjectType()
class UserResponse {
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  user?: User;
}

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async create(
    @Arg("username") username: string,
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    if (!validateEmail)
      return {
        error: "Enter a valid email.",
      };
    if (!validateUsername)
      return {
        error:
          "Enter a valid username. It can contain only alphabets, numbers, '_' and '.'",
      };
    if (!validateName)
      return {
        error: "Enter a valid name. It can contain only alphabets.",
      };
    if (!validatePassword)
      return {
        error:
          "Password is too weak. It should have at least one uppercase letter, one lowercase letter, one digit, one special character, and should be at least 8 characters long.",
      };

    const hashedPassword = await bcrypt.hash(password, hashingSalts);

    const connection = getConnection();
    const UserRepository = connection.getRepository(User);
    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await UserRepository.save(user);
    return {
      user: {
        id: user.id,
        email,
        username,
        name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
