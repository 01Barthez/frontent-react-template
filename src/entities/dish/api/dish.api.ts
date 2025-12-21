import type { Dish, DishFilters } from "../model/dish.types";
import { apiClient } from "../../../shared/api/client";
import type { PaginatedResponse } from "../../../shared/types";

export const dishApi = {
  // Récupérer tous les plats avec filtres et pagination
  getDishes: async (
    filters?: DishFilters,
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<Dish>> => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    if (filters) {
      if (filters.category) params.set("category", String(filters.category));
      if (typeof filters.available !== "undefined")
        params.set("available", String(filters.available));
      if (filters.priceRange) {
        if (typeof filters.priceRange.min !== "undefined")
          params.set("price_min", String(filters.priceRange.min));
        if (typeof filters.priceRange.max !== "undefined")
          params.set("price_max", String(filters.priceRange.max));
      }
    }

    return apiClient.get(`/dishes?${params.toString()}`);
  },

  // Récupérer un plat par ID
  getDish: async (id: string): Promise<Dish> => {
    return apiClient.get(`/dishes/${id}`);
  },

  // Créer un nouveau plat
  createDish: async (
    dish: Omit<Dish, "id" | "createdAt" | "updatedAt">
  ): Promise<Dish> => {
    return apiClient.post("/dishes", dish);
  },

  // Mettre à jour un plat
  updateDish: async (id: string, dish: Partial<Dish>): Promise<Dish> => {
    return apiClient.put(`/dishes/${id}`, dish);
  },

  // Supprimer un plat
  deleteDish: async (id: string): Promise<void> => {
    return apiClient.delete(`/dishes/${id}`);
  },
};
