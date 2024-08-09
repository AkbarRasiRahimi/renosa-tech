import { signIn } from 'next-auth/react'
import { SiApple, SiFacebook, SiGoogle } from 'react-icons/si'
import SocialButton from './buttons/SocialButton'

export default function SocialButtonsContainer() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleAppleSignIn = () => {
    signIn("apple", { callbackUrl: "/" });
  };

  const handleFacebookSignIn = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center gap-4">
      <SocialButton handleClick={handleGoogleSignIn} Icon={SiGoogle} />
      <SocialButton handleClick={handleAppleSignIn} Icon={SiApple} />
      <SocialButton handleClick={handleFacebookSignIn} Icon={SiFacebook} />
    </div>
  );
}
