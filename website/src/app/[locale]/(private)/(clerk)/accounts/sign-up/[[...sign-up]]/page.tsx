import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex justify-center items-center w-full h-full min-h-dvh">
      <SignUp />
    </div>
  );
}
