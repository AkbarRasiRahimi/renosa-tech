"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions";
import { toast } from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { NOUNS } from "@/enums/nouns.js";
import SideAds from "@/components/SideAds";

export default function SignUpPage() {
  const [formState, formAction] = useFormState(signup, {});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRetry, setShowPasswordRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef();
  const emailRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (formState.messages && formState.messages["type"] === NOUNS.SUCCESS) {
      toast.success(formState.messages["text"]);
      router.push(`/verify?email=${emailRef.current.value}`);
    } else if (formState.messages && formState.messages["type"] === NOUNS.WARNING) {
      toast.error(formState.messages["text"]);
    }
    recaptchaRef.current.reset();
    setIsLoading(false);
  }, [formState, router]);

  const { status } = useSession();
  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    const formData = new FormData(event.target);
    formData.append("recaptcha", recaptchaValue);
    formAction(formData);
  };

  return (
    <>
      <div className="flex gap-1">
        {" "}
        <div className="card shadow-xl w-full sm:w-96 bg-base-100 ">
          <div className="card-body p-6">
            <h1 className="text-3xl text-center font-bold mb-2">{NOUNS.CREATE_ACCOUNT}</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label  ">{NOUNS.FULL_NAME}</label>
                <input
                  type="text"
                  name="displayName"
                  maxLength={40}
                  className="input input-bordered input-primary input-sm text-xs w-full bg-transparent "
                  placeholder={NOUNS.FULL_NAME}
                />
              </div>
              <div className="form-control mt-3">
                <label className="label  ">{NOUNS.EMAIL}</label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  maxLength={40}
                  className="input input-bordered input-primary input-sm text-xs w-full bg-transparent "
                  placeholder={NOUNS.EMAIL}
                />
              </div>
              <div className="form-control my-3 relative">
                <label className="label ">{NOUNS.PASSWORD}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    maxLength={30}
                    className="input input-bordered input-primary input-sm text-xs w-full bg-transparent "
                    placeholder={NOUNS.PASSWORD}
                  />
                  <button
                    type="button"
                    className={`absolute right-4 top-2 ${
                      showPassword ? "text-primary" : "text-muted"
                    } hover:text-primary`}
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaRegEye className="h-4 w-4" /> : <FaRegEyeSlash className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="form-control my-3 relative">
                <label className="label ">{NOUNS.PASSWORDRETRY}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    maxLength={30}
                    className="input input-bordered input-primary input-sm text-xs w-full bg-transparent "
                    placeholder={NOUNS.PASSWORDRETRY}
                  />
                  <button
                    type="button"
                    className={`absolute right-4 top-2 ${
                      showPasswordRetry ? "text-primary" : "text-muted"
                    } hover:text-primary`}
                    onClick={() => setShowPasswordRetry((prev) => !prev)}>
                    {showPasswordRetry ? <FaRegEye className="h-4 w-4" /> : <FaRegEyeSlash className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {formState.errors && (
                <ul className="text-error mt-4">
                  {Object.keys(formState.errors).map((key) => (
                    <li key={key}>{formState.errors[key]}</li>
                  ))}
                </ul>
              )}

              <SubmitButton text={NOUNS.SIGN_UP} isLoading={isLoading} />
            </form>
            <p className="mt-4 text-center text-xs">
              {NOUNS.ALREADY_HAVE_AN_ACCOUNT}
              <Link href="/" className="ml-2 text-primary font-bold hover:underline">
                {NOUNS.SIGNIN}
              </Link>
            </p>
          </div>
        </div>
        <SideAds />
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LcmBRIqAAAAAKVj_DiSJyk7QMydAJk4uAVCFz4I"
        className="mt-5 flex justify-center"
        size="invisible"
        onErrored={() => {
          toast.error(NOUNS.RECAPTCHA_FAILED);
        }}
      />
    </>
  );
}
