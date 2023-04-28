// src/services/AuthService.ts
export const saveUserId = (userId: string) => {
    localStorage.setItem("user_id", userId);
  };
  
  export const getUserId = () => {
    return localStorage.getItem("user_id");
  };
  