import { Cookies } from "react-cookie";

const cookies = new Cookies();

class CookieService {
  get(name: string) {
    return cookies.get(name);
  }
  set(name: string, value: string, options: { path: "/"; expires: Date }) {
    return cookies.set(name, value, options);
  }
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieService();
