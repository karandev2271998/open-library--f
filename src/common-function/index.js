export function AuthFormFields(type) {
  switch (type) {
    case "forget_password":
      return {
        email: "",
      };
      break;
    case "login":
      return {
        email: "",
        password: "",
      };
      break;
    default:
      return {
        name: "",
        email: "",
        password: "",
      };
  }
}
