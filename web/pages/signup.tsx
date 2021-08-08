import React, { useState } from "react";
import Link from "next/link";
import AuthenticationLayout from "../components/authenticationLayout";
import InputField from "../components/inputField";
import StateButton from "../components/stateButton";
import { useCreateMutation } from "../generated/graphql";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utils/validation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showUsernameError, setShowUsernameError] = useState<boolean>(false);
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [create, { loading, data }] = useCreateMutation();

  return (
    <AuthenticationLayout>
      <section className="flex-1 px-8 sm:px-16 md:px-40 py-16 md:py-40">
        <header className="mb-8 text-center text-2xl text-darkBlue font-semibold opacity-0 animate-jumpUp">
          Create Your Gems Account
        </header>
        <div className="w-full sm:w-3/4 md:w-2/3 mx-auto">
          <p className="mb-2 text-sm text-red-500">{data?.create.error}</p>
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Name"
            value={name}
            setValue={setName}
            showError={showNameError}
            errorMsg={`Are you kidding me? ${name}?`}
            validationFn={() => {
              if (!validateName(name) && name) setShowNameError(true);
              else setShowNameError(false);
            }}
          />
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Username"
            value={username}
            setValue={setUsername}
            showError={showUsernameError}
            errorMsg={`A username can contain only alphabets, numbers, '_' and '.'`}
            validationFn={() => {
              if (!validateUsername(username) && username)
                setShowUsernameError(true);
              else setShowUsernameError(false);
            }}
          />
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Email"
            value={email}
            setValue={setEmail}
            showError={showEmailError}
            errorMsg="Invalid email."
            validationFn={() => {
              if (!validateEmail(email) && email) setShowEmailError(true);
              else setShowEmailError(false);
            }}
          />
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Password"
            value={password}
            type="password"
            setValue={setPassword}
            errorMsg="Password is too weak. It should have at least one uppercase letter, one lowercase letter, one digit, one special character, and should be at least 8 characters long."
            showError={showPasswordError}
            validationFn={() => {
              if (!validatePassword(password) && password)
                setShowPasswordError(true);
              else setShowPasswordError(false);
            }}
          />
          <StateButton
            wrapperClassNames="opacity-0 animate-jumpUp"
            classNames="block ml-auto"
            label="Create"
            state={
              loading
                ? "fetching"
                : !showEmailError && email && password
                ? "enabled"
                : "disabled"
            }
            onClick={async () => {
              await create({
                variables: {
                  createEmail: email,
                  createName: name,
                  createPassword: password,
                  createUsername: username,
                },
              });
            }}
          />
          <p className="text-xs text-darkBlue opacity-0 animate-jumpUp">
            Already have an account?
            <Link href="/login">
              <a className="ml-1 underline">Login here.</a>
            </Link>
          </p>
        </div>
      </section>
    </AuthenticationLayout>
  );
};

export default Login;
