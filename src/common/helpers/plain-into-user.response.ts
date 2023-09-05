import { UserResponse } from '../../users/dto/user.response';

export function plainIntoUserResponse(user: any): UserResponse {
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      slug: user.slug,
      gender: user.gender,
    },
    token: '',
  };
}
