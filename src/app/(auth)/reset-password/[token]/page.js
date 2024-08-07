"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPassword, checkResetToken } from "@/actions/auth-actions";
import SubmitButton from "@/components/SubmitButton";
import { NOUNS } from "@/enums/nouns.js";
import SideAds from "@/components/SideAds";

export default function ResetPasswordPage({ params }) {
  const [formState, formAction] = useFormState(resetPassword, {});
  const router = useRouter();
  const token = params.token;
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    checkResetToken(token).then((resetTokenExists) => {
      console.log(resetTokenExists);
      if (!resetTokenExists) {
        toast.error("Reset token does not exist. Please try again.");
        router.push("/reset-password");
      }
    });
  }, [token, router]);

  useEffect(() => {
    if (formState.messages && formState.messages["type"] === "success") {
      toast.success(formState.messages["text"]);
      router.push("/");
    } else if (formState.messages && formState.messages["type"] === "warning") {
      toast.error(formState.messages["text"]);
    }
    recaptchaRef.current.reset();
    setIsLoading(false);
  }, [formState, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    const formData = new FormData(event.target);
    formData.append("recaptcha", recaptchaValue);
    formData.append("token", token);
    formAction(formData);
  };

  return (
    <>
      <div className="flex gap-1">
        {" "}
        <div className="w-[300px] p-6 bg-white rounded-lg shadow-md z-10">
          <h1 className="text-2xl font-bold mb-4">{NOUNS.RESET_PASSWORD}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control my-3 relative">
              <label className="label ">{NOUNS.PASSWORD}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  maxLength={30}
                  className="input input-bordered input-primary input-sm w-full bg-transparent "
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
            </div>
            {formState.errors && (
              <ul className="text-error mt-4">
                {Object.keys(formState.errors).map((key) => (
                  <li key={key}>{formState.errors[key]}</li>
                ))}
              </ul>
            )}
            <SubmitButton text="Reset Password" isLoading={isLoading} />
          </form>
          <button onClick={() => router.push("/")} className="btn btn-secondary btn-sm w-full mt-5">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Sign In
          </button>
        </div>
        <SideAds />
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        onErrored={() => {
          toast.error(NOUNS.RECAPTCHA_ERROR);
        }}
        sitekey="6LcmBRIqAAAAAKVj_DiSJyk7QMydAJk4uAVCFz4I"
        className="mt-5 flex justify-center"
      />
    </>
  );
}
