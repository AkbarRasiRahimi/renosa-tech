import React, { LegacyRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { NOUNS } from "@/enums/nouns.js";
interface ReCaptchaProps {
  recaptchaRef: LegacyRef<ReCAPTCHA>;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ recaptchaRef }) => {

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY) return null;
  
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      onErrored={() => {
        toast.error(NOUNS.RECAPTCHA_FAILED);
      }}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}
      className="mt-5 flex justify-center"
    />
  );
};

export default ReCaptcha;
