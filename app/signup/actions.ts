"use server";

export type SignupState = {
  status: "success" | "error";
  message: string;
};

export const initialSignupState: SignupState = {
  status: "error",
  message: "",
};

export async function submitSignup(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const name = formData.get("name");
  const email = formData.get("email");

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === ""
  ) {
    return { status: "error", message: "Enter your name and work email to continue." };
  }

  return {
    status: "success",
    message: `Thanks, ${name.trim()}! We'll reach out to ${email.trim()} shortly.`,
  };
}
