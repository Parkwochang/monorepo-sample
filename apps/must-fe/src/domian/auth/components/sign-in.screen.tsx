import { EmailLoginForm, OAuthLoginForm } from './sign-in';

interface Props {
  type: 'email';
}

export const SignInScreen = async ({ type }: Props) => {
  return <>{type === 'email' ? <EmailLoginForm /> : <OAuthLoginForm />}</>;
};
