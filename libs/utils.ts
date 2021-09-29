export const isAuthRoute = (route: string) => {
  return route === "/login" || route === "/register";
};
