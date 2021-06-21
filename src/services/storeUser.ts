import { localStore } from './localStore';

export const refUpcomingGames = localStore("refCountyUpcomingGames", []);
export const secClubUpcomingGames = localStore("secClubUpcomingGames", []);
export const secCountyUpcomingGames = localStore("secCountyUpcomingGames", []);
export const secCountyUpcomingCountyGames = localStore("secCountyUpcomingCountyGames", []);
export const secProvinceUpcomingGames = localStore("secProvinceUpcomingGames", []);
export const secCouncilUpcomingGames = localStore("secCouncilUpcomingGames", []);
export const teamOfficialUpcomingGames = localStore("teamOfficialUpcomingGames", []);

export const memberDocument = localStore("memberDocument", "");
export const userEmail = localStore("userEmail", "");
export const refereeOfClub = localStore("refereeOfClub", false);
export const refereeOfCounty = localStore("refereeOfCounty", false);
export const secretaryOfClub = localStore("secretaryOfClub", false);
export const secretaryOfCounty = localStore("secretaryOfCounty", false);
export const secretaryOfProvince = localStore('secretaryOfProvince', false);
export const secretaryOfCouncil = localStore('secretaryOfCouncil', false);
export const teamOfficial = localStore('teamOfficial', false);
export const firstName = localStore('firstName', "");
export const lastName = localStore('lastName', "");
export const clubRef = localStore('clubRef', "");
export const teams = localStore('teams', []);
export const games = localStore('games', []);
export const countyCrest = localStore('countyCrest', "");
export const clubName = localStore('clubName', "");
export const countyName = localStore('countyName', "");
export const provinceName = localStore('provinceName', "");
export const crest = localStore('crest', "");

export const resetStore = () => {
    try {
        try {
            memberDocument.set("");
        } catch (e) {
            console.log(`Logout resetStore memberDocument ${e}`);
        }
        try {
            userEmail.set("");
        } catch (e) {
            console.log(`Logout resetStore userEmail ${e}`);
        }
        try {
            refereeOfClub.set(false);
        } catch (e) {
            console.log(`Logout resetStore refereeOfClub ${e}`);
        }
        try {
            refereeOfCounty.set(false);
        } catch (e) {
            console.log(`Logout resetStore refereeOfCounty ${e}`);
        }
        try {
            secretaryOfClub.set(false);
        } catch (e) {
            console.log(`Logout resetStore secretaryOfClub ${e}`);
        }
        try {
            secretaryOfCounty.set(false);
        } catch (e) {
            console.log(`Logout resetStore secretaryOfCounty: ${e}`);
        }
        try {
            secretaryOfProvince.set(false);
        } catch (e) {
            console.log(`Logout resetStore secretaryOfProvince ${e}`);
        }
        try {
            secretaryOfCouncil.set(false);
        } catch (e) {
            console.log(`Logout resetStore secretaryOfCouncil ${e}`);
        } try {
            teamOfficial.set(false);
        } catch (e) {
            console.log(`Logout resetStore teamOfficial ${e}`);
        } try {
            firstName.set("");
        } catch (e) {
            console.log(`Logout resetStore firstName ${e}`);
        } try {
            lastName.set("");
        } catch (e) {
            console.log(`Logout resetStore lastName ${e}`);
        } try {
            clubRef.set("");
        } catch (e) {
            console.log(`Logout clubRef ${e}`);
        } try {
            teams.set([]);
        } catch (e) {
            console.log(`Logout resetStore teams ${e}`);
        } try {
            games.set([]);
        } catch (e) {
            console.log(`Logout resetStore games ${e}`);
        }
        // try {
        //     clubCrest.set("");
        // } catch (e) {
        //     console.log(`Logout clubCrest ${e}`);
        // }
        try {
            countyCrest.set("");
        } catch (e) {
            console.log(`Logout resetStore countyCrest ${e}`);
        } try {
            clubName.set("");
        } catch (e) {
            console.log(`Logout resetStore clubName ${e}`);
        } try {
            countyName.set("");
        } catch (e) {
            console.log(`Logout resetStore CountyName ${e}`);
        } try {
            provinceName.set("");
        } catch (e) {
            console.log(`Logout resetStore ProvinceName ${e}`);
        } try {
            refUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore refUpcomingGames ${e}`);
        } try {
            secClubUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secClubUpcomingGames ${e}`);
        } try {
            secCountyUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCountyUpcomingGames ${e}`);
        } try {
            secProvinceUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secProvUpcomingGames ${e}`);
        } try {
            secCouncilUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCouncilUpcomingGames ${e}`);
        } try {
            teamOfficialUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore teamOfficialUpcomingGames ${e}`);
        }
        try {
            crest.set("");
        } catch (e) {
            console.log(`Logout resetStore crest ${e}`);
        } try {
            console.log("Store Reset");
        } catch (e) {
            console.log(`Logout resetStore exception ${e}`);
        }
    } catch (e) {
        console.log(`resetStore exception ${e}`);
    }
};

