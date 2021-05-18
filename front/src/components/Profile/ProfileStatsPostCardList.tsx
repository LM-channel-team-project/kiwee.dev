import { User } from 'next-auth';

interface ProfileStatsPostCardListProps {
  user: User;
  selected: string;
}

function ProfileStatsPostCardList({ user, selected }: ProfileStatsPostCardListProps) {
  return <section>...</section>;
}

export default ProfileStatsPostCardList;
