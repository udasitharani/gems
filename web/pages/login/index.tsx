import React, { useState } from "react";
import AuthenticationLayout from "../../components/authenticationLayout";
import InputField from "../../components/inputField";
import StateButton from "../../components/stateButton";
import { useLoginMutation } from "../../generated/graphql";
import { validateEmail, validateUsername } from "../../utils/validation";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUsernameOrEmailError, setShowUsernameOrEmailError] =
    useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      console.log("data");
      console.log(data);
      setLoginError(data.login.error?.toString());
    },
  });

  return (
    <AuthenticationLayout>
      <section className="flex-1 px-8 sm:px-16 md:px-40 py-16 md:py-40">
        <header className="mb-8 text-center text-2xl text-darkBlue font-semibold opacity-0 animate-jumpUp">
          Login to your Gems account
        </header>
        <div className="w-full sm:w-3/4 md:w-2/3 mx-auto">
          <p className="mb-2 text-sm text-red-500">{loginError}</p>
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Email/Username"
            value={usernameOrEmail}
            setValue={setUsernameOrEmail}
            showError={showUsernameOrEmailError}
            errorMsg="Invalid username/email."
            validationFn={() => {
              if (
                !validateEmail(usernameOrEmail) &&
                !validateUsername(usernameOrEmail) &&
                usernameOrEmail
              )
                setShowUsernameOrEmailError(true);
              else setShowUsernameOrEmailError(false);
            }}
          />
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Password"
            value={password}
            type="password"
            setValue={setPassword}
          />
          <StateButton
            wrapperClassNames="opacity-0 animate-jumpUp"
            classNames="block ml-auto"
            label="Login"
            state={
              loading
                ? "fetching"
                : !showUsernameOrEmailError && usernameOrEmail && password
                ? "enabled"
                : "disabled"
            }
            onClick={async () => {
              await login({
                variables: {
                  loginUsernameOrEmail: usernameOrEmail,
                  loginPassword: password,
                },
              });
            }}
          />
        </div>
      </section>
    </AuthenticationLayout>
  );
};

export default Login;
