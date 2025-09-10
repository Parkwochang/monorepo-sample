const REGEX_ID = /^[a-zA-Z0-9]{4,20}$/;

const REGEX_PASSWORD =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,20}$/;

const REGEX_PHONE = /^\d{3}-\d{3,4}-\d{4}$/;

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REGEX_NICKNAME = /^[\uAC00-\uD7A3a-zA-Z0-9]{2,8}$/;

// const REGEX_EMAIL_DOMAIN = /^[a-zA-Z._%+-]+\.(com|net|co\.kr)$/;
const REGEX_EMAIL_DOMAIN = /^[a-zA-Z._%+-]+(\.[a-zA-Z]{2,})+$/;

export const REGEX = {
  ID: REGEX_ID,
  PASSWORD: REGEX_PASSWORD,
  PHONE: REGEX_PHONE,
  EMAIL: REGEX_EMAIL,
  NICKNAME: REGEX_NICKNAME,
  EMAIL_DOMAIN: REGEX_EMAIL_DOMAIN,
}