import type { sessionInfoState } from "@/models/types";
import { ConfigProvider } from 'antd';

import Profiles_table from "@/components/AntDesign/tables/Profiles_table";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';

export default function Manager_section_profiles(props: {sessionInfo: sessionInfoState}) {
    const { profiles, loading } = useGetProfiles();

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ea7af4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
        <Profiles_table profiles={profiles} loading={loading} />
      </ConfigProvider>
    </>
  );
}
