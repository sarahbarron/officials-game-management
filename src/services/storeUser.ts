//import { writable } from './writable';
import { writable } from "svelte-local-storage-store";

// Arrays of games
export const refUpcomingGames = writable("refCountyUpcomingGames", []);
export const refPastGames = writable("refPastGames", []);

export const secClubUpcomingGames = writable("secClubUpcomingGames", []);
export const secClubPastGames = writable("secClubPastGames", []);

export const secCountyUpcomingClubGames = writable("secCountyUpcomingGames", []);
export const secCountyPastClubGames = writable("secCountyPastGames", []);

export const secCountyUpcomingCountyGames = writable("secCountyUpcomingCountyGames", []);
export const secCountyPastCountyGames = writable("secCountyPastCountyGames", []);

export const secProvinceUpcomingGames = writable("secProvinceUpcomingGames", []);
export const secProvincePastGames = writable("secProvincePastGames", []);

export const secCouncilUpcomingGames = writable("secCouncilUpcomingGames", []);
export const secCouncilPastGames = writable("secCouncilPastGames", []);

export const teamOfficialUpcomingGames = writable("teamOfficialUpcomingGames", []);
export const teamOfficialPastGames = writable("teamOfficialPastGames", []);

export const allGames = writable("allGames", []);
// Members Id
export const memberId = writable("memberId", "");
export const userEmail = writable("userEmail", "");
export const refereeOfClub = writable("refereeOfClub", false);
export const refereeOfCounty = writable("refereeOfCounty", false);
export const secretaryOfClub = writable("secretaryOfClub", false);
export const secretaryOfCounty = writable("secretaryOfCounty", false);
export const secretaryOfProvince = writable('secretaryOfProvince', false);
export const secretaryOfCouncil = writable('secretaryOfCouncil', false);
export const teamOfficial = writable('teamOfficial', false);
export const firstName = writable('firstName', "");
export const lastName = writable('lastName', "");
export const clubRef = writable('clubRef', "");
export const teams = writable('teams', []);
export const games = writable('games', []);
export const countyCrest = writable('countyCrest', "");
export const clubName = writable('clubName', "");
export const countyName = writable('countyName', "");
export const provinceName = writable('provinceName', "");
export const crest = writable('crest', "");

export const resetStore = async () => {
    try {
        try {
            allGames.set([]);
        }
        catch (e) {
            console.log(`Logout resetStore allGames exception: ${e}`);
        }
        try {
            memberId.set("");
        } catch (e) {
            console.log(`Logout resetStore memberId ${e}`);
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

