"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormState } from "react-dom";
import { sendResetPasswordLink } from "@/actions/email-actions";
import SubmitButton from "@/components/SubmitButton";
import { NOUNS } from "@/enums/nouns.js";
import SideAds from "@/components/SideAds";

export default function ResetPasswordPage() {
  const [formState, formAction] = useFormState(sendResetPasswordLink, {});
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef();

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
    formAction(formData);
  };

  return (
    <>
      <div className="flex gap-1">
        <div className="w-[300px] p-6 bg-white rounded-lg shadow-md z-10">
          <h1 className="text-2xl font-bold mb-4">{NOUNS.RESET_PASSWORD}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {NOUNS.EMAIL}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={NOUNS.EMAIL}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {formState.errors && (
              <ul className="text-error mt-4">
                {Object.keys(formState.errors).map((key) => (
                  <li key={key}>{formState.errors[key]}</li>
                ))}
              </ul>
            )}
            <SubmitButton text={NOUNS.RESET} isLoading={isLoading} />
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
              {NOUNS.BACK}
            </button>{" "}
          </form>
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
