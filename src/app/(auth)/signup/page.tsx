import SignupForm from "@/components/form/auth/singUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh">
      <h1 className="bg-white sr-only">회원가입 페이지</h1>
      <SignupForm />
    </div>
  );
}
