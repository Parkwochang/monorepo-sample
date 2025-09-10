import { EmailLoginForm } from '../email.form';
import { OAuthLoginForm } from '../oauth.form';

interface Props {
  type: 'email';
}

export const SignInScreen = async ({ type }: Props) => {
  return <>{type === 'email' ? <EmailLoginForm /> : <OAuthLoginForm />}</>;
};
