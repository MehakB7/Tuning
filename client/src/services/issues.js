import axios from "axios";
import { END_POINTS } from "./domain";
export const createIssues = async (body) => {
    try {
      const response = await axios.post(`${END_POINTS.createIssues}`, body);
      if (response?.data) {
        return {
          data: response.data,
          error: false,
        };
      }
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  };

  export const likeIssues = async (body) => {
    try {
      const response = await axios.post(`${END_POINTS.likeIssues}`, body);
      if (response?.data) {
        return {
          data: response.data,
          error: false,
        };
      }
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  };

  export const dislikeIssues = async (body) => {
    try {
      const response = await axios.post(`${END_POINTS.dislikeIssues}`, body);
      if (response?.data) {
        return {
          data: response.data,
          error: false,
        };
      }
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  };

  export const updateIssues = async (body) => {
    try {
      const response = await axios.post(`${END_POINTS.updateIssues}`, body);
      if (response?.data) {
        return {
          data: response.data,
          error: false,
        };
      }
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  };
  
  
  export const likeCommentOnReason = async (body) => {
    try {
      const response = await axios.post(`${END_POINTS.likeCommentOnReason}`, body);
      if (response?.data) {
        return {
          data: response.data,
          error: false,
        };
      }
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  };