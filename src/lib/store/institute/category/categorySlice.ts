import { Status } from "@/src/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICategory,
  ICreateCategoryData,
  IEditCategoryPayload,
  IInitialCategoryData,
} from "./types.category";
import { AppDispatch } from "../../store";
import { APIWITHTOKEN } from "@/src/lib/http";

const initialState: IInitialCategoryData = {
  categories: [],
  status: Status.LOADING,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories(
      state: IInitialCategoryData,
      action: PayloadAction<ICategory[]>,
    ) {
      state.categories = action.payload;
    },
    setStatus(state: IInitialCategoryData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteCategory(
      state: IInitialCategoryData,
      action: PayloadAction<string>,
    ) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
    },
    setEditCategory(
      state: IInitialCategoryData,
      action: PayloadAction<IEditCategoryPayload>,
    ) {
      const { id, data } = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === id ? { ...category, ...data } : category,
      );
    },
  },
});

export const { setCategories, setStatus, setDeleteCategory, setEditCategory } =
  categorySlice.actions;
export default categorySlice.reducer;

export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.get("/api/institute/category");
      if (response.status === 200) {
        dispatch(setCategories(response.data.data ?? []));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function createCategory(data: ICreateCategoryData) {
  return async function createCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/api/institute/category", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchCategories());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating category:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteCategory(categoryId: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(
        `/api/institute/category/${categoryId}`,
      );
      if (response.status === 200) {
        dispatch(setDeleteCategory(categoryId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function editCategory(
  categoryId: string,
  data: Partial<Omit<ICategory, "id">>,
) {
  return async function editCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.put(
        `/api/institute/category/${categoryId}`,
        data,
      );
      if (response.status === 200) {
        dispatch(setEditCategory({ id: categoryId, data }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing category:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
