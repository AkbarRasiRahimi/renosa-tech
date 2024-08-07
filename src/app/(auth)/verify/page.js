"use client";
import Image from "next/image";
import bgImage from "@/assets/image/background.png";
import { useState, useEffect, useRef } from "react";
import { getVerifyExpiry, verifyEmail } from "@/actions/verify-actions";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import sendVerifyEmail from "@/actions/email-actions";
import ReCAPTCHA from "react-google-recaptcha";
import { NOUNS } from "@/enums/nouns.js";
import { MESSAGES } from "@/enums/enums.js";
import SubmitButton from "@/components/SubmitButton";
export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const params = useSearchParams();
  const recaptchaRef = useRef();
  const router = useRouter();
  const email = params.get("email");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (showTimer) {
      const res = await verifyEmail(email, code, await recaptchaRef.current.executeAsync());
      if (res.messages && res.messages["type"] === NOUNS.SUCCESS) {
        toast.success(res.messages["text"]);
        router.push("/");
      } else if (res.messages && res.messages["type"] === NOUNS.WARNING) {
        toast.error(res.messages["text"]);
      }
      recaptchaRef.current.reset();
    } else {
      const res = await sendVerifyEmail(email);

      if (res) {
        toast.success(NOUNS.VERIFICATION_EMAIL_SEND);
        setShowTimer(true);
        setMinutes(5);
        setSeconds(0);
      } else {
        toast.error(NOUNS.VERIFICATION_EMAIL_NOT_SEND);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        setShowTimer(false);
      } else if (seconds === 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  useEffect(() => {
    const fetchExpiry = async () => {
      if (!email) {
        router.push("/signup");
      }

      const expiry = await getVerifyExpiry(email);
      if (!expiry) {
        setShowTimer(false);
        return;
      }

      const minutes = Math.floor(expiry / 60) % 60;
      const seconds = Math.floor(expiry) % 60;
      setMinutes(minutes);
      setSeconds(seconds);
      setShowTimer(true);
    };
    fetchExpiry();
  }, [email, router]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-focus relative">
      <Image src={bgImage} alt="bg" className="w-full h-full object-cover absolute top-0 left-0 " />
      <div className="w-[300px] p-6 bg-white rounded-lg shadow-md z-10">
        <h1 className="text-2xl font-bold mb-4">{NOUNS.VERIFY_EMAIL}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {NOUNS.VERIFICATION_CODE}
            </label>
            <input
              type="text"
              id="code"
              name="code"
              pattern="\d{6}"
              title="Please enter a 6 digit pin code"
              className="bg-gray-50 border text-center text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {showTimer && (
            <p className="text-sm text-gray-500 mb-2">{MESSAGES.TIME_REMAINING_MINUTES_SECONDS(minutes, seconds)}</p>
          )}
          <SubmitButton text={!showTimer ? NOUNS.RESEND_CODE : NOUNS.VERIFY} isLoading={isLoading} />
        </form>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        onErrored={() => {
          toast.error(NOUNS.RECAPTCHA_FAILED);
        }}
        sitekey="6LcmBRIqAAAAAKVj_DiSJyk7QMydAJk4uAVCFz4I"
        className="mt-5 flex justify-center"
      />
    </div>
  );
}
