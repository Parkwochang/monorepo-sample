type SNSType = 'kakao' | 'naver' | 'google';

type OAuthLoginInfo = {
  [K in SNSType]?: {
    logo: string;
    style: string;
    textStyle: string;
    title: string;
  };
};
