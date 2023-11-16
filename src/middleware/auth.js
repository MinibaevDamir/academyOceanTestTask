export default function auth(isLoggedIn, next) {
  if (isLoggedIn) {
    return next();
  } else {
    return next("/");
  }
}
