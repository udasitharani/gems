export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateUsername(username: string): boolean {
  const re = /^[a-zA-Z][a-zA-Z0-9_\.]+[a-zA-Z0-9]$/;
  return re.test(username);
}

export function validateName(username: string): boolean {
  const re = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
  return re.test(username);
}

export function validatePassword(password: string): boolean {
  const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  return re.test(password);
}
