import { parseJWT } from '@repo/utils';
import { redirectPage } from '@workspace/http/lib';
import { AuthEntity, getUser } from '@workspace/http/must/auth';
import { Button } from '@workspace/ui/components/button';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const userInfo = parseJWT(await getUser()) as AuthEntity.UserInfo | undefined;

  if (!userInfo) return redirectPage('/sign-in');

  if (userInfo.role === 'LEADER') return redirectPage('/manager');

  if (userInfo.role === 'ADMIN') return redirectPage('/admin');

  return redirectPage('/sign-in');

  return (
    <main>
      랜딩 페이지
      <Link href="/sign-in">
        <Button>로그인하기</Button>
      </Link>
      {/* <ThemeImage
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}
    </main>
  );
}
