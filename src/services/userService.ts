import BaseService from "./baseService";

class UserService extends BaseService {
  constructor() {
    super("users");
  }

  register(username: string, password: string) {
    return this.post("register", { username, password });
  }

  login(username: string, password: string) {
    return this.post("login", { username, password });
  }

  me() {
    return this.get("me");
  }
}

export default new UserService();
