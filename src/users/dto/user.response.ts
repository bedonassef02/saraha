export interface UserResponse {
  user: {
    id: string;
    email: string;
    username: string;
    gender: string;
    slug: string;
  };

  token: string;
}
