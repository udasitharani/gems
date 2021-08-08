import { useMeQuery } from "../generated/graphql";
import Link from "next/link";

export default function Home() {
  const { data } = useMeQuery();
  return (
    <main className="mx-auto w-max">
      <div>Hello, {data?.me.user?.name}</div>
      <br />
      <div>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
      <div>
        <Link href="/signup">
          <a>Create Account</a>
        </Link>
      </div>
    </main>
  );
}
