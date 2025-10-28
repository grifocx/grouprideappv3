import { UserAvatar } from '../UserAvatar';

export default function UserAvatarExample() {
  return (
    <div className="flex gap-4 items-center p-4">
      <UserAvatar name="Sarah Johnson" size="sm" />
      <UserAvatar name="Mike Chen" size="md" />
      <UserAvatar name="Alex Rivera" size="lg" />
    </div>
  );
}
