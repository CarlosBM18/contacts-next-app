export const isAuthRoute = (route: string) => {
  return route === "/login" || route === "/register";
};

export function generateRandomNumber(maxNum: number) {
  return Math.floor(Math.random() * maxNum) + 1;
}
