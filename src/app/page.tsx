"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormState } from "react-dom"; // Ensure this is the correct import
import { signInAction } from "@/actions/auth-actions";
import SubmitButton from "@/components/buttons/SubmitButton";
import { signIn } from "next-auth/react";
import { MESSAGES } from "@/enums/enums.js";
import { NOUNS } from "@/enums/nouns.js";
import SocialButtonsContainer from "@/components/SocialButtonsContainer";
import SideAds from "@/components/SideAds";
import ReCaptcha from "@/components/google/ReCaptcha";

const loginCredentials = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: true,
      email,
      password,
    });
  } catch (error: any) {
    toast.error(error);
  }
};

type FormState = {
  errors?: {
    email?: string;
    password?: string;
    recaptcha?: string;
    display_name?: string;
  };
  messages?: {
    type?: string;
    text?: string;
  };
};

export default function SignInPage() {
  const initialState: FormState = {};

  const [formState, formAction] = useFormState(signInAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (formState.messages) {
      const { type, text } = formState.messages;
      if (text && type === NOUNS.SUCCESS) {
        toast.success(text);
        if (emailRef.current && passwordRef.current) {
          loginCredentials(emailRef.current.value, passwordRef.current.value);
        }
      } else if (text && type === NOUNS.WARNING) {
        toast.error(text);
        if (text === MESSAGES.MUST_EMAIL_VERIFICATION().text && emailRef.current) {
          router.push(`/verify?email=${emailRef.current.value}`);
        }
      }
    }

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setIsLoading(false);
  }, [formState, router]);

  const { status } = useSession();
  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const recaptchaValue = await recaptchaRef.current?.executeAsync();
    const formData = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      recaptcha: recaptchaValue as string,
    };
    console.log(formData);
    formAction(formData);
  };

  return (
    <div className="bg-neutral-focus relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex gap-1">
        <div className="card w-full bg-base-100 shadow-xl sm:w-96">
          <div className="card-body p-6">
            <h1 className="mb-3 text-center text-3xl font-bold">
              {NOUNS.WELCOME}
              <span className="text-primary">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">{NOUNS.EMAIL}</label>
                <input
                  type="text"
                  name="email"
                  maxLength={40}
                  ref={emailRef}
                  className="input input-sm input-bordered text-xs input-primary w-full bg-transparent"
                  placeholder={NOUNS.EMAIL}
                />
                {formState.errors?.email && <span className="text-error mt-1">{formState.errors.email}</span>}
              </div>

              <div className="form-control relative my-3">
                <label className="label">{NOUNS.PASSWORD}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    ref={passwordRef}
                    maxLength={30}
                    className="input input-sm input-bordered text-xs input-primary w-full bg-transparent"
                    placeholder={NOUNS.PASSWORD}
                  />
                  <button
                    type="button"
                    className={`absolute right-4 top-2 ${
                      showPassword ? "text-primary" : "text-muted"
                    } hover:text-primary`}
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaRegEye className="h-4 w-4" /> : <FaRegEyeSlash className="h-4 w-4" />}
                  </button>
                </div>
                {formState.errors?.password && <span className="text-error mt-1">{formState.errors.password}</span>}
              </div>
              <p className="text-center text-xs">
                {NOUNS.FORGETPASSWORD}
                <Link href="/reset-password" className="ml-2 font-bold text-primary hover:underline">
                  {NOUNS.CLICK_HERE}
                </Link>
              </p>
              <SubmitButton text={NOUNS.SIGNIN} isLoading={isLoading} />
            </form>
            <div className="divider">{NOUNS.OR}</div>
            <SocialButtonsContainer />
            <p className="mt-4 text-center text-xs">
              {NOUNS.SIGNUPTEXT}
              <Link href="/register" className="ml-2 font-bold text-primary hover:underline">
                {NOUNS.SIGNUPBUTTON}
              </Link>
            </p>
          </div>
        </div>
        <SideAds />
      </div>
      <ReCaptcha recaptchaRef={recaptchaRef} />
    </div>
  );
}
