import { UserResponse } from '../../users/dto/user.response';
import { ProfileResponse } from '../../profile/types/profile.response';

export function PlainIntoProfileResponse(user: any): ProfileResponse {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    slug: user.slug,
    gender: user.gender,
    image: user.image,
  };
}
