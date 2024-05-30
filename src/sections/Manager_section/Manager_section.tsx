import AntDesign_table from "@/components/AntDesign/tables/Profiles_table";
import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Material_booking_form(props: {sessionInfo: ProfileSession}) {
  const { profiles, loading } = useGetProfiles();

  return (
    <AntDesign_table profiles={profiles} loading={loading} />
  );
}
