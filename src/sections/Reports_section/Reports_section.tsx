import React from 'react';

import {MultiType} from "@/components/charts/MultiType";
import {Line} from "@/components/charts/Line";
import BalanceDisplay from "@/components/AntDesign/display/BalanceDisplay";
import type {Reports} from "@/models/types";
import useGetBalances from "@/services/client/customhooks/useGetBalances";
import useGetWeeklieReport from "@/services/client/customhooks/useGetWeeklieReport";

const ReportsSection: React.FC = () => {
    // Implement your component logic here
    const { balances, loadingBalances, errorBalances } = useGetBalances();
    const { weeklieReports, loadingWeeklieReport, errorWeeklieReport } = useGetWeeklieReport();

    const balance_reports = (balances as any)?.result?.data as Reports;
    const weeklieReports_reports = (weeklieReports as any)?.result?.data as any;

    return (
        <div>
            {balance_reports && <BalanceDisplay balance_reports={balance_reports}/>}
            {balance_reports && <MultiType balance_reports={balance_reports}/>}
            {weeklieReports_reports && <Line weeklieReports_reports={weeklieReports_reports}/>}
        </div>
    );
};

export default ReportsSection;