export const ivalidCredentialsLogin = () => {
  return {
    title: "invalid credentials",
    description: "please check your email and password and try again",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  };
};

export const loginSuccess = () => {
  return {
    title: "logged in",
    description: "enjoy the moment",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  };
};

export const userExists = () => {
  return {
    title: "account already exists",
    description:
      "an account for this email address already exists. please log in to that account or request a password reset.",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  };
};

export const verifyEmailSent = () => {
  return {
    title: "email sent",
    description: "a verification email has been sent to the address provided",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  };
};

export const invalidEmailSignup = () => {
  return {
    title: "invalid email",
    description: "please enter a valid email and try again.",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  };
};

export const invalidPasswordSignup = (error) => {
  return {
    title: "invalid password",
    description: `${error.message.toLowerCase()}`,
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  };
};

export const invalidCredentialsSignup = () => {
  return {
    title: "invalid credentials",
    description:
      "please use a valid email and password with at least 6 characters",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  };
};
