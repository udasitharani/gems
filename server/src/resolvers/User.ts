import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/validation";
import {
  hashingSalts,
  TypeGraphqlContext,
  __cookieOptions__,
  __jwtCookieName__,
  __jwtSecret__,
  __prod__,
} from "../constants";

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
    @Ctx() { res }: TypeGraphqlContext,
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
    if (await UserRepository.findOne({ where: { email } }))
      return {
        error: "A user with that email already exists.",
      };
    if (await UserRepository.findOne({ where: { username } }))
      return {
        error: "Uh-oh! That username is already taken.",
      };

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    try {
      await UserRepository.save(user);
    } catch (error) {
      console.log(error);
      return {
        error: "Oops! Something went wrong :/",
      };
    }

    if (!__jwtSecret__)
      return {
        error: "Oops! Something went wrong.",
      };

    const token = jwt.sign({ id: user.id }, __jwtSecret__);
    res.cookie(__jwtCookieName__, token, __cookieOptions__);
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { res }: TypeGraphqlContext
  ): Promise<UserResponse> {
    if (usernameOrEmail.trim() === "" || password.trim() === "")
      return { error: "Empty credentials? Really?" };

    if (
      !(validateEmail(usernameOrEmail) || validateUsername(usernameOrEmail))
    ) {
      return {
        error: "Enter a valid username/email.",
      };
    }

    const connection = getConnection();
    const UserRepository = connection.getRepository(User);
    let user = await UserRepository.findOne({
      where: { email: usernameOrEmail },
    });
    if (!user)
      user = await UserRepository.findOne({
        where: { username: usernameOrEmail },
      });

    if (!user) {
      return {
        error: "User does not exist.",
      };
    }

    if (!user.password) return { error: "You are logged in with Github." };

    if (!__jwtSecret__)
      return {
        error: "Oops! Something went wrong.",
      };
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, __jwtSecret__);
      res.cookie(__jwtCookieName__, token, __cookieOptions__);
      return {
        user,
      };
    }

    return {
      error: "Invalid credentials.",
    };
  }
}
