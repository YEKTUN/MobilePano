import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../url";

export const createPano = createAsyncThunk(
  "pano/createPano",
  async (panoName, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/pano/create-pano`, {
        panoName,
      });
      return response.data.newPano;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePano = createAsyncThunk(
  "pano/deletePano",
  async (panoId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/pano/delete-pano/${panoId}`);
      return panoId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComponentToPano = createAsyncThunk(
  "pano/addComponentToPano",
  async ({ panoId, componentType, componentId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/pano/add-component`, {
        panoId,
        componentType,
        componentId,
      });
      return response.data.pano;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeComponentFromPano = createAsyncThunk(
  "pano/removeComponentFromPano",
  async ({ panoId, componentId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}/pano/remove-component/${panoId}/${componentId}`
      );
      return response.data.pano;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComponentInPano = createAsyncThunk(
  "pano/updateComponentInPano",
  async ({ componentId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/pano/update-component`, {
        componentId,
        updateData,
      });
      return response.data.updatedComponent;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPanoWithComponents = createAsyncThunk(
  "pano/getPanoWithComponents",
  async (panoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/pano/pano-with-components/${panoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllPanos = createAsyncThunk(
  "pano/getAllPanos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/pano/get-all-panos`);
      return response.data.panos;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComponentOrder = createAsyncThunk(
  "pano/updateComponentOrder",
  async ({ panoId, newOrder }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/pano/update-order`, {
        panoId,
        newOrder,
      });
      return response.data.pano;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const duplicateComponentInPano = createAsyncThunk(
  "pano/duplicateComponentFromPano",
  async ({ panoId, componentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/pano/duplicate-component`, {
        panoId,
        componentId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bilinmeyen hata");
    }
  }
);

const panoSlice = createSlice({
  name: "pano",
  initialState: {
    panoList: [],
    currentPano: null,
    currentComponent: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetPanoState: (state) => {
      state.panoList = [];
      state.currentPano = null;
      state.currentComponent = null;
      state.status = "idle";
      state.error = null;
    },
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    reorderComponents: (state, action) => {
      const newOrder = action.payload;

      if (state.currentPano) {
        state.currentPano.components = newOrder;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(duplicateComponentInPano.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
      })

      .addCase(createPano.fulfilled, (state, action) => {
        state.panoList.push(action.payload);
      })

      .addCase(deletePano.fulfilled, (state, action) => {
        state.panoList = state.panoList.filter(
          (pano) => pano._id !== action.payload
        );
      })

      .addCase(addComponentToPano.fulfilled, (state, action) => {
        state.currentPano = action.payload;
      })

      .addCase(removeComponentFromPano.fulfilled, (state, action) => {
        state.currentPano = action.payload;
      })

      .addCase(updateComponentInPano.fulfilled, (state, action) => {
        if (state.currentPano) {
          const index = state.currentPano.components.findIndex(
            (c) => c.refId === action.payload._id
          );
          if (index !== -1) {
            state.currentPano.components[index] = action.payload;
          }
        }
      })

      .addCase(getPanoWithComponents.fulfilled, (state, action) => {
        state.currentPano = action.payload;
      })

      .addCase(getAllPanos.fulfilled, (state, action) => {
        state.panoList = action.payload;
      })

      .addCase(updateComponentOrder.fulfilled, (state, action) => {
        state.currentPano = action.payload;
        console.log("✅ Güncellenmiş pano:", state.currentPano);
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload?.message || "İşlem başarısız";
        }
      );
  },
});

export const { resetPanoState, setCurrentComponent, reorderComponents } =
  panoSlice.actions;

export default panoSlice.reducer;
