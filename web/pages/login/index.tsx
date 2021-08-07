import React, { useEffect, useMemo, useState } from "react";
import AuthenticationLayout from "../../components/authenticationLayout";
import InputField from "../../components/inputField";
import StateButton from "../../components/stateButton";
import { validateEmail, validatePassword } from "../../utils/validation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState<boolean>(false);

  return (
    <AuthenticationLayout>
      <section className="flex-1 px-8 sm:px-16 md:px-40 py-16 md:py-40">
        <header className="mb-8 text-center text-2xl text-darkBlue font-semibold opacity-0 animate-jumpUp">
          Login to you Gems account
        </header>
        <div className="w-full sm:w-3/4 md:w-2/3 mx-auto">
          <InputField
            classNames="opacity-0 animate-jumpUp"
            label="Email/Username"
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
          />
          <StateButton
            wrapperClassNames="opacity-0 animate-jumpUp"
            classNames="block ml-auto"
            label="Login"
            state={
              !showEmailError && email && password ? "enabled" : "disabled"
            }
            onClick={() => {}}
          />
        </div>
      </section>
    </AuthenticationLayout>
  );
};

export default Login;
