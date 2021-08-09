import { localStore } from './localStore';

// Arrays of games
export const refUpcomingGames = localStore("refCountyUpcomingGames", []);
export const refPastGames = localStore("refPastGames", []);

export const secClubUpcomingGames = localStore("secClubUpcomingGames", []);
export const secClubPastGames = localStore("secClubPastGames", []);

export const secCountyUpcomingClubGames = localStore("secCountyUpcomingGames", []);
export const secCountyPastClubGames = localStore("secCountyPastGames", []);

export const secCountyUpcomingCountyGames = localStore("secCountyUpcomingCountyGames", []);
export const secCountyPastCountyGames = localStore("secCountyPastCountyGames", []);

export const secProvinceUpcomingGames = localStore("secProvinceUpcomingGames", []);
export const secProvincePastGames = localStore("secProvincePastGames", []);

export const secCouncilUpcomingGames = localStore("secCouncilUpcomingGames", []);
export const secCouncilPastGames = localStore("secCouncilPastGames", []);

export const teamOfficialUpcomingGames = localStore("teamOfficialUpcomingGames", []);
export const teamOfficialPastGames = localStore("teamOfficialPastGames", []);

export const allGames = localStore("allGames", []);
// Members Id
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

export const resetStore = async () => {
    try {
        try {
            allGames.set([]);
        }
        catch (e) {
            console.log(`Logout resetStore allGames exception: ${e}`);
        }
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
        }
        try {
            refPastGames.set([]);
        }
        catch (e) {
            console.log(`Logout resetStore refPastGames ${e}`);
        }
        try {
            secClubUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secClubUpcomingGames ${e}`);
        }
        try {
            secClubPastGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secClubPastGames ${e}`);
        }
        try {
            secCountyUpcomingCountyGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCountyUpcomingCountyGames ${e}`);
        }
        try {
            secCountyPastCountyGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCountyPastCountyGames ${e}`);
        }
        try {
            secCountyUpcomingClubGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCountyUpcomingClubGames ${e}`);
        }
        try {
            secCountyPastClubGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCountyPastClubGames ${e}`);
        }
        try {
            secProvinceUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secProvUpcomingGames ${e}`);
        }
        try {
            secProvincePastGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secProvincePastGames ${e}`);
        }
        try {
            secCouncilUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCouncilUpcomingGames ${e}`);
        }
        try {
            secCouncilPastGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore secCouncilPastGames ${e}`);
        }
        try {
            teamOfficialUpcomingGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore teamOfficialUpcomingGames ${e}`);
        }
        try {
            teamOfficialPastGames.set([]);
        } catch (e) {
            console.log(`Logout resetStore teamOfficialPastGames ${e}`);
        }
        try {
            crest.set("");
        } catch (e) {
            console.log(`Logout resetStore crest ${e}`);
        }
    } catch (e) {
        console.log(`resetStore exception ${e}`);
    }
};

