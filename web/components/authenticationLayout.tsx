import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LearningIllustration from "../public/images/learning-illustration.png";

const AuthenticationLayout: React.FC = ({ children }) => {
  const [layoutWidth, setLayoutWidth] = useState("w-0");

  useEffect(() => {
    setTimeout(() => {
      setLayoutWidth("md:w-2/5 lg:w-1/3 px-8");
    }, 600);
  }, []);
  return (
    <main className="flex w-full h-full">
      <aside
        className={`hidden md:block ${layoutWidth} overflow-hidden h-full py-4 bg-indigo-50 float-left transition-all duration-300`}
      >
        <header className="text-darkBlue text-xl font-bold opacity-0 animate-jumpUp">
          <Link href="/">
            <a>Gems</a>
          </Link>
        </header>
        <section className="flex flex-col justify-center items-center h-3/4 text-darkBlue">
          <Image
            src={LearningIllustration}
            alt="learning illustration"
            className="w-full opacity-0 animate-jumpUp"
          />
          <header className="text-3xl font-semibold leading-normal opacity-0 animate-jumpUp">
            Learn and Share.
          </header>
          <p className="text-lg font-medium leading-normal opacity-0 animate-jumpUp">
            via micro blogs.
          </p>
        </section>
      </aside>
      {children}
    </main>
  );
};

export default AuthenticationLayout;
