import BaseService from "./baseService";

class FavoriteLocationsService extends BaseService {
  constructor() {
    super("favorite_locations");
  }

  getUserLocations(userId: string) {
    return this.get(`get_user_locations/${userId}`);
  }
}

export default new FavoriteLocationsService();
