"use server";

export type DemoState = {
  status: "success" | "error";
  message: string;
};

export const initialDemoState: DemoState = {
  status: "error",
  message: "",
};

export async function submitDemoRequest(
  _prevState: DemoState,
  formData: FormData,
): Promise<DemoState> {
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
    message: `Thanks, ${name.trim()}! We'll email ${email.trim()} to schedule your demo.`,
  };
}
