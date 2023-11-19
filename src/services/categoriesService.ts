import BaseService from "./baseService";

class CategoriesService extends BaseService {
  constructor() {
    super("categories");
  }

  getByUserId(userId: string) {
    return this.get(`get_by_user_id/${userId}`);
  }
}

export default new CategoriesService();
