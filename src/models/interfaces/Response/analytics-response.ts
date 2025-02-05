export interface AnalyticsDashboard {
    usersByCountry: Array<CountryData>;
    usersByDevices: Array<DevicesData>;
    visitors: GeneralData;
    sessions: GeneralData;
    averageDurationPersession: GeneralData;
    bounceRate: GeneralData;
    engagedSessions: GeneralData;
    pagesViewedPerSession: GeneralData;
    pageViews: GeneralData;
    oldVsNewUsers: OldVsNew;
}

export interface CountryData {
    countryName: string;
    usersDetails: {total: number, new: number, active: number};
}

export interface DevicesData {
    deviceName: string; 
    userCount: number
}

export interface GeneralData {
    total: number; 
    diffPercent: number;
}

export interface OldVsNew {
    repeating: number; 
    new: number;
}