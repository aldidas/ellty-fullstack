"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { fromErrorToFormState, type FormState } from "@/lib/utils";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log({ session });
  return session;
}

export async function signIn(
  _: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const email = formData.get("email");
  const password = formData.get("password");
  const signInData = signInSchema.safeParse({
    email,
    password,
  });

  if (!signInData.success) {
    return fromErrorToFormState(signInData.error, formData);
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: signInData?.data?.email || "",
        password: signInData?.data?.password || "",
        callbackURL: `${process.env.PUBLIC_BETTER_AUTH_URL}/`,
      },
      headers: await headers(),
    });
  } catch (error) {
    return fromErrorToFormState(error, formData);
  }
  redirect("/");
}

export async function signUp(
  _: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const signUpData = signUpSchema.safeParse({
    name,
    email,
    password,
  });

  if (!signUpData.success) {
    return fromErrorToFormState(signUpData.error, formData);
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: signUpData.data.name,
        email: signUpData.data.email,
        password: signUpData.data.password,
        callbackURL: `${process.env.PUBLIC_BETTER_AUTH_URL}/`,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error, formData);
  }
  redirect("/");
}
