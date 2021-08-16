import {
    userEmail, memberId,
    refereeOfClub, refereeOfCounty, secretaryOfClub, secretaryOfCounty, secretaryOfProvince,
    secretaryOfCouncil, teamOfficial, firstName, lastName, clubRef, clubName,
    crest, countyCrest, countyName, provinceName,
    refUpcomingGames, refPastGames,
    secCountyUpcomingClubGames, secCountyPastClubGames,
    secCountyUpcomingCountyGames, secCountyPastCountyGames,
    secClubUpcomingGames, secClubPastGames,
    secProvinceUpcomingGames, secProvincePastGames,
    secCouncilUpcomingGames, secCouncilPastGames,
    teamOfficialUpcomingGames, teamOfficialPastGames, allGames
} from './storeUser';
import { db } from "./firebase";
import { convertTimestampToDate, convertTimestampToTime } from '../services/util';
import type firebase from 'firebase';

const member = db.collection('Member');

let clubId: string;
let countyId: string;
let allgames = [];

/* Retrieve member details, club details and county details
*/
export let getMember = async (email: string) => {
    try {
        await getMemberDetails(email);
        if (clubId != null && clubId != undefined) {
            await getClubDetails(clubId);
        }
        if (countyId != null && countyId != undefined) {
            await getCountyDetails(countyId);
        }
    } catch (e) {
        console.log("getMember exception: " + e);
        return
    }
}

/* Retrieve a members details from firestore
*/
export let getMemberDetails = async (email: string) => {
    try {
        const querySnapshot = await member.where("email", "==", email).get()
        querySnapshot.forEach((doc) => {
            let memberDoc = doc.id;
            let refOfClub = doc.data().refereeOfClub;
            let refOfCounty = doc.data().refereeOfCounty;
            let secOfClub = doc.data().secretaryOfClub;
            let secOfCounty = doc.data().secretaryOfCounty;
            let secOfProvince = doc.data().secretaryOfProvince;
            let secOfCouncil = doc.data().secretaryOfCouncil;
            let teamOf = doc.data().teamOfficial;
            let fName = doc.data().firstName;
            let lName = doc.data().lastName;
            clubId = doc.data().ownClub.id;

            if (memberDoc != undefined && memberDoc != null) {
                memberId.set(memberDoc);
            }
            if (email != undefined && email != null) {
                userEmail.set(email);
            }
            if (refOfClub != undefined && refOfClub != null) {
                refereeOfClub.set(refOfClub);
            }
            if (refOfCounty != undefined && refOfCounty != null) {
                refereeOfCounty.set(refOfCounty);
            }
            if (secOfClub != undefined && secOfClub != null) {
                secretaryOfClub.set(secOfClub);
            }
            if (secOfCouncil != null && secOfCouncil != undefined) {
                secretaryOfCounty.set(secOfCounty);
            }
            if (secOfProvince != null && secOfProvince != undefined) {
                secretaryOfProvince.set(secOfProvince);
            }
            if (secOfCouncil != null && secOfCouncil != undefined) {
                secretaryOfCouncil.set(secOfCouncil);
            }
            if (teamOf != null && teamOf != undefined) {
                teamOfficial.set(teamOf);
                if (teamOf) {
                    getTeamOfficialUpcomingGames(memberDoc);
                    getTeamOfficialPastGames(memberDoc);
                }
            }
            if (fName != null && fName != undefined) {
                firstName.set(fName);
            }
            if (lName != null && lName != undefined) {
                lastName.set(lName);
            }
            if (clubId != null && clubId != undefined) {
                clubRef.set(clubId);
                if (secOfClub) {
                    getSecretaryOfClubUpcomingGames(clubId);
                    getSecretaryOfClubPastGames(clubId);
                }
                if (secOfCounty) {
                    getSecretaryOfCountyUpcomingClubGames(clubId);
                    getSecretaryOfCountyUpcomingCountyGames(clubId);
                    getSecretaryOfCountyPastClubGames(clubId);
                    getSecretaryOfCountyPastCountyGames(clubId);
                }
                if (secOfProvince) {
                    getSecretaryOfProvinceUpcomingGames(clubId);
                    getSecretaryOfProvincePastGames(clubId);
                }
                if (secOfCouncil) {
                    getSecretaryOfCouncilUpcomingGames();
                    getSecretaryOfCouncilPastGames();
                }
            }

            if (refOfClub || refOfCounty) {
                getRefereeUpcomingGames(memberDoc);
                getRefereePastGames(memberDoc);
            }

        });
        return true;
    } catch (e) {
        console.log("getMemberDetails exception: " + e);
        return
    }
}

/* Retrieve the games from firebase for the users club, 
the date and time is in the future and order the documents 
by date and time.
*/
export let getSecretaryOfClubUpcomingGames = async (clubId: string) => {
    try {

        let games = [];
        let i = 0;
        const clubRef = await db.collection("Club").doc(clubId);
        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("clubsOrCounties", "array-contains", clubRef)
            .where("dateTime", ">=", new Date())
            .orderBy("dateTime")
            .get();
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            let id = gamePromise.gameId;
            let competition = gamePromise.competition;
            let secretaryId = gamePromise.secretaryId;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            let matchStarted = gamePromise.matchStarted;
            let matchEnded = gamePromise.matchEnded;

            const game = {
                id: id,
                competition: competition,
                secretaryId: secretaryId,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue,
                matchStarted: matchStarted,
                matchEnded: matchEnded
            }

            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];
            }
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                secClubUpcomingGames.set(games);
                allGames.set(allgames);
                console.log(`secClubUpcomingGames set`);
            }
            i++;
        });
        return;

    } catch (e) {
        console.log(`getSecretaryOfClubUpcomingGames exception: ${e}`);
    }
}
/**
 * Secretary of Club Past Games
 */
export let getSecretaryOfClubPastGames = async (clubId: string) => {
    try {

        let games = [];
        let i = 0;
        const clubRef = await db.collection("Club").doc(clubId);
        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("clubsOrCounties", "array-contains", clubRef)
            .where("dateTime", "<=", new Date())
            .orderBy("dateTime")
            .get();
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            let id = gamePromise.gameId;
            let competition = gamePromise.competition;
            let secretaryId = gamePromise.secretaryId;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            let matchStarted = gamePromise.matchStarted;
            let matchEnded = gamePromise.matchEnded;

            const game = {
                id: id,
                competition: competition,
                secretaryId: secretaryId,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue,
                matchStarted: matchStarted,
                matchEnded: matchEnded
            }


            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];
            }
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                secClubPastGames.set(games);
                allGames.set(allgames);
                console.log(`secClubPastGames set`);
            }
            i++;
        });
        return;

    } catch (e) {
        console.log(`getSecretaryOfClubPastGames exception: ${e}`);
    }
}
/* Retrieve the county games from firebase for the users county, 
the date and time is in the future and order the documents 
by date and time.
*/
export let getSecretaryOfCountyUpcomingCountyGames = async (clubId: string) => {
    try {
        let i = 0;
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();
        const countyRef = club.data().county;

        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("clubsOrCounties", "array-contains", countyRef)
            .where("dateTime", ">=", new Date())
            .orderBy("dateTime")
            .get();
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            let id = gamePromise.gameId;
            let competition = gamePromise.competition;
            let secretaryId = gamePromise.secretaryId;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            let matchStarted = gamePromise.matchStarted;
            let matchEnded = gamePromise.matchEnded;
            const game = {
                id: id,
                competition: competition,
                secretaryId: secretaryId,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue,
                matchStarted: matchStarted,
                matchEnded: matchEnded
            }


            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];

            }
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                secCountyUpcomingCountyGames.set(games);
                allGames.set(allgames);
                console.log(`secCountyUpcomingCountyGames set`);
            }
            i++;
        });
        return;

    } catch (e) { console.log(`getSecretaryUpcomingCountyGames exception: ${e}`); }
}

/**
 * Secretary of County past county games
 */
export let getSecretaryOfCountyPastCountyGames = async (clubId: string) => {
    try {
        let i = 0;
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();
        const countyRef = club.data().county;

        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("clubsOrCounties", "array-contains", countyRef)
            .where("dateTime", "<=", new Date())
            .orderBy("dateTime")
            .get();
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            let id = gamePromise.gameId;
            let competition = gamePromise.competition;
            let secretaryId = gamePromise.secretaryId;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            let teamATookToField = gamePromise.teamATookToField;
            let teamBTookToField = gamePromise.teamBTookToField;
            let matchStarted = gamePromise.matchStarted;
            let matchEnded = gamePromise.matchEnded;
            const game = {
                id: id,
                secretaryId: secretaryId,
                competition: competition,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue,
                teamATookToField: teamATookToField,
                teamBTookToField: teamBTookToField,
                matchStarted: matchStarted,
                matchEnded: matchEnded
            }


            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];

            }
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                secCountyPastCountyGames.set(games);
                allGames.set(allgames);
                console.log(`secCountyPastCountyGames set`);
            }
            i++;
        });
        return;

    } catch (e) { console.log(`getSecretaryPastCountyGames exception: ${e}`); }
}

/* Retrieve the club games from firebase for the users county, 
the date and time is in the future and order the documents 
by date and time.
*/
export let getSecretaryOfCountyUpcomingClubGames = async (clubId: string) => {
    try {
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();
        const countyRef = club.data().county;
        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("county", "==", countyRef).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get()
            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;

                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secCountyUpcomingClubGames.set(games);
                    allGames.set(allgames);
                    console.log(`secCountyUpcomingClubGames set`);
                }
                i++;
            });

            return;
        });

    } catch (e) {
        console.log(`getSecretaryOfCountyUpcomingClubGames exception: ${e}`);
    }
}

/**
 * Get Secretary of County past Club Games
 */
export let getSecretaryOfCountyPastClubGames = async (clubId: string) => {
    try {
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();
        const countyRef = club.data().county;
        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("county", "==", countyRef).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", "<=", new Date())
                .orderBy("dateTime")
                .get()
            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let teamATookToField = gamePromise.teamATookToField;
                let teamBTookToField = gamePromise.teamBTookToField;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    teamATookToField: teamATookToField,
                    teamBTookToField: teamBTookToField,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded

                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secCountyPastClubGames.set(games);
                    allGames.set(allgames);
                    console.log(`secCountyPastClubGames set`);
                }
                i++;
            });

            return;
        });

    } catch (e) {
        console.log(`getSecretaryOfCountyPastClubGames exception: ${e}`);
    }
}

/* Retrieve the games from firebase for the users province, 
the date and time is in the future and order the documents 
by date and time.
*/
export let getSecretaryOfProvinceUpcomingGames = async (clubId: string) => {
    try {
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();

        const countyRef = club.data().county;
        const county = await db.collection("County").doc(countyRef.id).get();

        const provinceRef = county.data().province;

        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("isProvincial", "==", provinceRef).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get()
            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secProvinceUpcomingGames.set(games);
                    allGames.set(allgames);
                }
                i++;
            });

            return;
        });
    } catch (e) {
        console.log(`getSecretaryOfProvinceUpcomingGames exception: ${e}`);

    }
}

/*
Retrieve Secretary of Province past games
*/
export let getSecretaryOfProvincePastGames = async (clubId: string) => {
    try {
        let games = [];
        const club = await db.collection("Club").doc(clubId).get();

        const countyRef = club.data().county;
        const county = await db.collection("County").doc(countyRef.id).get();

        const provinceRef = county.data().province;

        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("isProvincial", "==", provinceRef).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", "<=", new Date())
                .orderBy("dateTime")
                .get()
            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let teamATookToField = gamePromise.teamATookToField;
                let teamBTookToField = gamePromise.teamBTookToField;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    teamATookToField: teamATookToField,
                    teamBTookToField: teamBTookToField,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secProvincePastGames.set(games);
                    allGames.set(allgames);
                    console.log(`secProvincePastGames set`);
                }
                i++;
            });

            return;
        });
    } catch (e) {
        console.log(`getSecretaryOfProvincePastGames exception: ${e}`);

    }
}
/* Retrieve the games from firebase where the games are national 
games, the date and time is in the future and order the documents 
by date and time.
*/
export let getSecretaryOfCouncilUpcomingGames = async () => {
    try {

        let games = [];
        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("isNational", "==", true).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get()


            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                if (gamePromise != undefined && gamePromise != null) {
                    let id = doc.id;
                    let competition = gamePromise.competition;
                    let secretaryId = gamePromise.secretaryId;
                    let date = gamePromise.date;
                    let time = gamePromise.time;
                    let linesmen = gamePromise.linesmen;
                    let umpires = gamePromise.umpires;
                    let referee = gamePromise.referee;
                    let substituteReferee = gamePromise.substituteReferee;
                    let teamA = gamePromise.teamA;
                    let teamB = gamePromise.teamB;
                    let venue = gamePromise.venue;
                    let matchStarted = gamePromise.matchStarted;
                    let matchEnded = gamePromise.matchEnded;
                    const game = {
                        id: id,
                        competition: competition,
                        secretaryId: secretaryId,
                        date: date,
                        time: time,
                        linesmen: linesmen,
                        umpires: umpires,
                        referee: referee,
                        substituteReferee,
                        teamA: teamA,
                        teamB: teamB,
                        venue: venue,
                        matchStarted: matchStarted,
                        matchEnded: matchEnded
                    }
                    if (!games.includes(game)) {
                        games = [...games, game];
                        allgames = [...allgames, game];

                    }
                }
                else {
                    console.log(`${doc.id} ${gamePromise}`);

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secCouncilUpcomingGames.set(games);
                    allGames.set(allgames);
                    console.log(`secCouncilUpcomingGames set`);
                }
                i++;

            });

            return;
        });


    } catch (e) {
        console.log(`getSecretaryOfCouncilUpcomingGames exception: ${e}`);

    }
}
/**
 * Get Secretary of Councils Past games
 */
export let getSecretaryOfCouncilPastGames = async () => {
    try {

        let games = [];
        const competitionsDocs = db.collection("Competition");
        const competitions = await competitionsDocs
            .where("isNational", "==", true).get();

        competitions.forEach(async (doc) => {
            let i = 0;
            const competitionRef = db.collection("Competition").doc(doc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshot = await gamesCollection
                .where("competition", "==", competitionRef)
                .where("dateTime", "<=", new Date())
                .orderBy("dateTime")
                .get()
            querySnapshot.forEach(async (doc) => {
                const gamePromise = await createGame(doc);
                if (gamePromise != undefined && gamePromise != null) {
                    let id = doc.id;
                    let competition = gamePromise.competition;
                    let secretaryId = gamePromise.secretaryId;
                    let date = gamePromise.date;
                    let time = gamePromise.time;
                    let linesmen = gamePromise.linesmen;
                    let umpires = gamePromise.umpires;
                    let referee = gamePromise.referee;
                    let substituteReferee = gamePromise.substituteReferee;
                    let teamA = gamePromise.teamA;
                    let teamB = gamePromise.teamB;
                    let venue = gamePromise.venue;
                    let teamATookToField = gamePromise.teamATookToField;
                    let teamBTookToField = gamePromise.teamBTookToField;
                    let matchStarted = gamePromise.matchStarted;
                    let matchEnded = gamePromise.matchEnded;
                    const game = {
                        id: id,
                        competition: competition,
                        secretaryId: secretaryId,
                        date: date,
                        time: time,
                        linesmen: linesmen,
                        umpires: umpires,
                        referee: referee,
                        substituteReferee,
                        teamA: teamA,
                        teamB: teamB,
                        venue: venue,
                        teamATookToField: teamATookToField,
                        teamBTookToField: teamBTookToField,
                        matchStarted: matchStarted,
                        matchEnded: matchEnded

                    }
                    // const game = convertPromiseToGameObject(gamePromise);


                    if (!games.includes(game)) {
                        games = [...games, game];
                        allgames = [...allgames, game];

                    }
                } else {
                    console.log(`${doc.id} ${gamePromise}`);
                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secCouncilPastGames.set(games);
                    allGames.set(allgames);
                }
                i++;
            });
            return;
        });

    } catch (e) {
        console.log(`getSecretaryOfCouncilPastGames exception: ${e}`);
    }
}
/* Retrieve the games from firebase where the referee
          is equal to this referee, the date and time is
          in the future and order the documents by date and
          time.
      */
export let getRefereeUpcomingGames = async (memberId: string) => {
    try {
        let i = 0;
        let games = [];
        const memberDoc = db.doc(`/Member/${memberId}`);
        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("referee", "==", memberDoc)
            .where("dateTime", ">=", new Date())
            .orderBy("dateTime")
            .get()
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            if (gamePromise != undefined && gamePromise != null) {
                let id = doc.id;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded

                }
                // const game = convertPromiseToGameObject(gamePromise);

                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
            }
            else (console.log("Doc Id " + doc.id + "gamePromise " + gamePromise));
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                refUpcomingGames.set(games);
                allGames.set(allgames);
            }
            i++;
        });

        return games;
    } catch (e) {
        console.log("getRefereeUpcomingGames exception: " + e);
        return
    }
}
/*
Get a referees past games
 */
export let getRefereePastGames = async (memberId: string) => {
    try {
        let i = 0;
        let games = [];
        const memberDoc = db.doc(`/Member/${memberId}`);
        const gamesCollection = db.collection("Game");
        const querySnapshot = await gamesCollection
            .where("referee", "==", memberDoc)
            .where("dateTime", "<=", new Date())
            .orderBy("dateTime")
            .get()
        querySnapshot.forEach(async (doc) => {
            const gamePromise = await createGame(doc);
            let id = gamePromise.gameId;
            let competition = gamePromise.competition;
            let secretaryId = gamePromise.secretaryId;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            let teamATookToField = gamePromise.teamATookToField;
            let teamBTookToField = gamePromise.teamBTookToField;
            let matchStarted = gamePromise.matchStarted;
            let matchEnded = gamePromise.matchEnded;
            const game = {
                id: id,
                competition: competition,
                secretaryId: secretaryId,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue,
                teamATookToField: teamATookToField,
                teamBTookToField: teamBTookToField,
                matchStarted: matchStarted,
                matchEnded: matchEnded
            }
            // const game = convertPromiseToGameObject(gamePromise);

            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];

            }
            if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                refPastGames.set(games);
                allGames.set(allgames);
            }
            i++;
        });

        return games;
    } catch (e) {
        console.log("getRefereePastGames exception: " + e);
        return
    }
}

/*
Retrieve Games for a team official
*/
export let getTeamOfficialUpcomingGames = async (memberId: string) => {
    try {
        let games = [];
        const memberRef = db.collection("Member").doc(memberId);
        const teamsCollection = db.collection("Team");
        const teamOfficialsTeams = await teamsCollection
            .where('teamOfficials', 'array-contains', memberRef)
            .get();
        teamOfficialsTeams.forEach(async (teamDoc) => {
            let i = 0;
            const teamRef = db.collection('Team').doc(teamDoc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshotA = await gamesCollection
                .where("teamA", "==", teamRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get();
            querySnapshotA.forEach(async (gameDoc) => {
                const gamePromise = await createGame(gameDoc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);

                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshotA.size - 1)) {
                    teamOfficialUpcomingGames.set(games);
                    allGames.set(allgames);
                    console.log(`teamOfficialUpcoming Games set`);

                }
                i++;
            });


            const querySnapshotB = await gamesCollection
                .where("teamB", "==", teamRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get();
            querySnapshotB.forEach(async (gameDocB) => {
                console.log(`Team: ${teamDoc.id} Game ${gameDocB.id}`);
                const gamePromise = await createGame(gameDocB);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);

                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshotB.size - 1)) {
                    teamOfficialUpcomingGames.set(games);
                    allGames.set(allgames);
                    console.log(`teamOfficialUpcoming Games set`);
                }
                i++;
            });
        });
    } catch (e) {
        console.log("getTeamOfficialUpcomingGames exception: " + e);
    }
}

/* Get team officials past Games
*/
export let getTeamOfficialPastGames = async (memberId: string) => {
    try {
        let games = [];
        const memberRef = db.collection("Member").doc(memberId);
        const teamsCollection = db.collection("Team");
        const teamOfficialsTeams = await teamsCollection
            .where('teamOfficials', 'array-contains', memberRef)
            .get();
        teamOfficialsTeams.forEach(async (teamDoc) => {
            let i = 0;
            const teamRef = db.collection('Team').doc(teamDoc.id);
            const gamesCollection = db.collection("Game");
            const querySnapshotA = await gamesCollection
                .where("teamA", "==", teamRef)
                .where("dateTime", "<=", new Date())
                .orderBy("dateTime")
                .get();
            querySnapshotA.forEach(async (gameDoc) => {
                const gamePromise = await createGame(gameDoc);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let teamATookToField = gamePromise.teamATookToField;
                let teamBTookToField = gamePromise.teamBTookToField;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    teamATookToField: teamATookToField,
                    teamBTookToField: teamBTookToField,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }
                // const game = convertPromiseToGameObject(gamePromise);

                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshotA.size - 1)) {
                    teamOfficialPastGames.set(games);
                    allGames.set(allgames);
                    console.log(`teamOfficialPastGames set`);

                }
                i++;
            });


            const querySnapshotB = await gamesCollection
                .where("teamB", "==", teamRef)
                .where("dateTime", ">=", new Date())
                .orderBy("dateTime")
                .get();
            querySnapshotB.forEach(async (gameDocB) => {
                console.log(`Team: ${teamDoc.id} Game ${gameDocB.id}`);
                const gamePromise = await createGame(gameDocB);
                let id = gamePromise.gameId;
                let competition = gamePromise.competition;
                let secretaryId = gamePromise.secretaryId;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                let teamATookToField = gamePromise.teamATookToField;
                let teamBTookToField = gamePromise.teamBTookToField;
                let matchStarted = gamePromise.matchStarted;
                let matchEnded = gamePromise.matchEnded;
                const game = {
                    id: id,
                    competition: competition,
                    secretaryId: secretaryId,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue,
                    teamATookToField: teamATookToField,
                    teamBTookToField: teamBTookToField,
                    matchStarted: matchStarted,
                    matchEnded: matchEnded
                }


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshotB.size - 1)) {
                    teamOfficialPastGames.set(games);
                    allGames.set(allgames);
                    console.log(`teamOfficialPastGames set`);
                }
                i++;
            });
        });
    } catch (e) {
        console.log("getTeamOfficialPastGames exception: " + e);
    }
}
/*
Get members first name and last name
*/
export let getMemberName = async (id: string) => {
    try {
        const member = db.collection("Member").doc(id);
        const doc = await member.get();
        if (doc.exists) {
            let firstName = doc.data().firstName;
            if (firstName == null || firstName == undefined) {
                firstName = "";
            }
            let lastName = doc.data().lastName;
            if (lastName == null || lastName == undefined) {
                lastName = ";"
            }
            let name = {
                id: doc.id,
                firstName: firstName,
                lastName: lastName
            }
            return name;
        }
        return;
    } catch (e) {
        console.log("getMemberName exception: " + e);
        return
    }
}

/*
Get Referees Name and Address
*/
export let getRefereeNameAndAddress = async (id: string) => {
    try {
        const member = db.collection("Member").doc(id);
        const doc = await member.get();
        if (doc.exists) {
            let firstName = doc.data().firstName;
            if (firstName == null || firstName == undefined) {
                firstName = "";
            }
            let lastName = doc.data().lastName;
            if (lastName == null || lastName == undefined) {
                lastName = ";"
            }

            let contactDetailsId = doc.data().contactDetails.id;


            let addressLine1 = ""
            let addressLine2 = ""
            let town = ""
            let county = ""
            let eircode = ""
            if (contactDetailsId != null || contactDetailsId != undefined) {
                const contactDetailsDoc = db.collection("ContactDetails").doc(contactDetailsId);
                const contactDetails = await contactDetailsDoc.get();
                if (contactDetails != null && contactDetails != undefined) {
                    addressLine1 = contactDetails.data().addressLine1;
                    addressLine2 = contactDetails.data().addressLine2;
                    town = contactDetails.data().town;
                    county = contactDetails.data().county;
                    eircode = contactDetails.data().eircode;
                }

            }
            let refereeDetails = {
                id: doc.id,
                firstName: firstName,
                lastName: lastName,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                town: town,
                county: county,
                eircode: eircode
            }
            return refereeDetails;
        }
        return;
    } catch (e) {
        console.log("getRefereeNameAndAddress exception: " + e);
        return
    }
}

/*
extract all details about a game from firestore and create a game
in the svelte store will all the details
*/
export let createGame = async (doc) => {
    try {
        let gameId = doc.id;
        let secretaryDoc = doc.data().secretary;
        let competitionId = doc.data().competition;
        let competition = {};
        let dateTime = doc.data().dateTime;
        let linesmen = doc.data().linesmen;
        let umpires = doc.data().umpires;
        let refereeId = doc.data().referee;
        let referee: {};
        let substituteRefereeId = doc.data().substituteReferee;
        let substituteReferee: {};
        let teamAId = doc.data().teamA;
        let teamA = {};
        let teamB = {};
        let teamBId = doc.data().teamB;
        let venueId = doc.data().venue;
        let teamATookToField = doc.data().teamATookToFieldAt;
        let teamBTookToField = doc.data().teamBTookToFieldAt;
        let matchStarted = doc.data().matchStarted;
        let matchEnded = doc.data().matchEnded;
        let venue = {};
        let time: any;
        let date: any;
        let secretaryId: string = "";

        if (teamATookToField == null || teamATookToField == undefined) {
            teamATookToField = "";
        }
        else {
            teamATookToField = convertTimestampToTime(teamATookToField);
        }
        if (teamBTookToField == null || teamBTookToField == undefined) {
            teamBTookToField = "";
        }
        else {
            teamBTookToField = convertTimestampToTime(teamBTookToField);
        }
        if (matchStarted == null || matchStarted == undefined) {
            matchStarted = "";
        }
        else {
            matchStarted = convertTimestampToTime(matchStarted);
        }
        if (matchEnded == null || matchEnded == undefined) {
            matchEnded = "";
        }
        else {
            matchEnded = convertTimestampToTime(matchEnded);
        }
        if (secretaryDoc != null && secretaryDoc != undefined) {
            secretaryId = secretaryDoc.id;
        }
        if (competitionId != null && competitionId != undefined) {
            competitionId = competitionId.id
            const compPromise = await getCompetition(competitionId);
            let id = compPromise.id;
            const county = compPromise.county;
            const province = compPromise.province;
            const isNational = compPromise.isNational;
            const name = compPromise.name;
            const sport = compPromise.sport;
            let gradeId = compPromise.gradeId;
            let grade = compPromise.grade;
            competition = {
                id: id,
                county: county,
                province: province,
                isNational: isNational,
                name: name,
                sport: sport,
                gradeId: gradeId,
                grade: grade
            }
        }
        else {
            competitionId = null;
            competition = null;
        }

        if (dateTime == undefined) {
            dateTime = null;
        }
        else {
            date = convertTimestampToDate(dateTime);
            time = convertTimestampToTime(dateTime);
        }
        if (linesmen == undefined) {
            linesmen = null;
        }
        if (refereeId != null && refereeId != undefined) {
            refereeId = refereeId.id;
            const refPromise = await getRefereeNameAndAddress(refereeId);
            let firstName = refPromise.firstName;
            let lastName = refPromise.lastName;
            let addressLine1 = refPromise.addressLine1;
            let addressLine2 = refPromise.addressLine2;
            let town = refPromise.town;
            let county = refPromise.county;
            let eircode = refPromise.eircode;
            let id = refPromise.id;


            referee = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                town: town,
                county: county,
                eircode: eircode

            };
        }
        else {
            refereeId = null;
        }
        if (substituteRefereeId != null && substituteRefereeId != undefined) {
            substituteRefereeId = substituteRefereeId.id;
            const subRefPromise = await getMemberName(substituteRefereeId);
            let firstName = subRefPromise.firstName;
            let lastName = subRefPromise.lastName;
            let id = subRefPromise.id
            substituteReferee = {
                id: id,
                firstName: firstName,
                lastName: lastName
            };
        }
        else {
            substituteRefereeId = null;
        }
        if (teamAId != null && teamAId != undefined) {
            teamAId = teamAId.id;
            const teamAPromise = await getTeam(gameId, teamAId);
            const id = teamAPromise.id;
            const clubId = teamAPromise.clubId;
            const county = teamAPromise.county;
            const gradeId = teamAPromise.gradeId;
            const grade = teamAPromise.grade;
            const name = teamAPromise.name;
            const players = teamAPromise.players;
            const sport = teamAPromise.sport;
            const teamName = teamAPromise.teamName;
            const teamOfficialIds = teamAPromise.teamOfficialIds;
            const teamOfficials = teamAPromise.teamOfficials;
            teamA = {
                id: id,
                clubId: clubId,
                county: county,
                gradeId: gradeId,
                grade: grade,
                name: name,
                players: players,
                sport: sport,
                teamName: teamName,
                teamOfficialIds: teamOfficialIds,
                teamOfficials: teamOfficials,
            }
        }
        else {
            teamAId = null;
        }
        if (teamBId != null && teamBId != undefined) {
            teamBId = teamBId.id;
            const teamAPromise = await getTeam(gameId, teamBId);
            const id = teamAPromise.id;
            const clubId = teamAPromise.clubId;
            const county = teamAPromise.county;
            const gradeId = teamAPromise.gradeId;
            const grade = teamAPromise.grade;
            const name = teamAPromise.name;
            const playerIds = teamAPromise.playerIds;
            const players = teamAPromise.players;
            const sport = teamAPromise.sport;
            const teamName = teamAPromise.teamName;
            const teamOfficialIds = teamAPromise.teamOfficialIds;
            const teamOfficials = teamAPromise.teamOfficials;
            teamB = {
                id: id,
                clubId: clubId,
                county: county,
                gradeId: gradeId,
                grade: grade,
                name: name,
                playerIds: playerIds,
                players: players,
                sport: sport,
                teamName: teamName,
                teamOfficialIds: teamOfficialIds,
                teamOfficials: teamOfficials,
            }
        }
        else {
            teamBId = null;
        }
        if (venueId != null && venueId != undefined) {
            venueId = venueId.id;
            const venuePromise = await getVenue(venueId);
            const id = venuePromise.id;
            const name = venuePromise.name;
            const lat = venuePromise.lat;
            const lng = venuePromise.lng;
            let clubId = venuePromise.clubId;
            const county = venuePromise.county;

            venue = {
                id: id,
                name: name,
                lat: lat,
                lng: lng,
                clubId: clubId,
                county: county
            }

        }
        else {
            venueId = null
        }

        const game = {
            gameId: gameId,
            secretaryId: secretaryId,
            competition: competition,
            date: date,
            time: time,
            dateTime: dateTime,
            linesmen: linesmen,
            referee: referee,
            substituteReferee: substituteReferee,
            teamA: teamA,
            teamB: teamB,
            umpires: umpires,
            venue: venue,
            teamATookToField: teamATookToField,
            teamBTookToField: teamBTookToField,
            matchStarted: matchStarted,
            matchEnded: matchEnded
        }
        return game;
    } catch (e) {
        console.log("createGame exception: " + e);
        return
    }
}

export let getGame = async (gameId: string) => {
    try {
        const gameDoc = await db.collection("Game").doc(gameId).get();
        if (gameDoc.exists) {
            const game = await createGame(gameDoc);
            return game;
        }
        return null;

    } catch (e) {
        console.log("getGame exception: " + e);
    }
}
/*
Retrieve competition details from firestore
*/
export let getCompetition = async (compId: string) => {
    try {

        const compDoc = db.collection("Competition").doc(compId);
        const doc = await compDoc.get();
        if (doc.exists) {
            let county = doc.data().county;
            if (county != null || county != undefined) {
                county = county.id;
            }
            else {
                county = null;
            }

            let province = doc.data().isProvincial;
            if (province === undefined) {
                province = null;
            }
            let isNational = doc.data().isNational;
            if (isNational == undefined) {
                isNational = null;
            }

            let name = doc.data().name;
            if (name == undefined) {
                name = null;
            }

            let sport = doc.data().sportType;
            if (sport != null && sport != undefined) {
                sport = sport.id;
            }
            else {
                sport = null;
            }

            let gradeId = doc.data().grade;
            let grade = {};
            if (gradeId != null && gradeId != undefined) {
                gradeId = gradeId.id;
                const gradePromise = await getGrade(gradeId);
                let level = gradePromise.level;
                if (level == null || level == undefined) {
                    level = null;
                }
                let name = gradePromise.name;
                if (name == null || name == undefined) {
                    name = null;
                }
                grade = {
                    level: level,
                    name: name
                }
            }
            else {
                gradeId = null;
            }

            let competition = {
                id: compId,
                county: county,
                province: province,
                isNational: isNational,
                name: name,
                sport: sport,
                gradeId: gradeId,
                grade: grade
            }

            return competition;

        }
        return;
    } catch (e) {
        console.log("getCompetition exception: " + e);
        return
    }
}

/*
Retrieve Team details from firestore 
*/
export let getTeam = async (gameId: string, teamId: string) => {
    try {
        console.log(`getTeam gameId: ${gameId}, teamId: ${teamId}`);
        const teamDoc = db.collection("Team").doc(teamId);
        const doc = await teamDoc.get();

        console.log(`getTeam doc ${doc.id} `);

        if (doc.exists) {

            let clubId = doc.data().club;
            let county = doc.data().county;
            let gradeId = doc.data().grade;
            let grade = {};
            let name = doc.data().name;
            let playerIds = doc.data().players;
            let players = [];
            let sport = doc.data().sportType;
            let teamName = doc.data().teamName;
            let teamOfficialIds = doc.data().teamOfficials;
            let teamOfficials = [];
            if (clubId != null && clubId != undefined) {
                clubId = clubId.id;
            }
            else {
                clubId = null;
            }
            if (county != null && county != undefined) {
                county = county.id;
            }
            else {
                county = null;
            }

            if (gradeId != null && gradeId != undefined) {
                gradeId = gradeId.id;
                const gradePromise = await getGrade(gradeId);
                const level = gradePromise.level;
                const name = gradePromise.name;
                grade = {
                    level: level,
                    name: name
                }
            }
            else {
                gradeId = null;
            }
            if (sport != null && sport != undefined) {
                sport = sport.id;
            }
            else {
                sport = null;
            }
            if (name == undefined) {
                name = null;
            }
            if (playerIds != null && playerIds != undefined) {
                for (let i = 0; i < playerIds.length; i++) {

                    const playerPromise = await getPlayerDetails(gameId, teamId, playerIds[i].id);
                    const id = playerPromise.id;
                    const firstName = playerPromise.firstName;
                    const lastName = playerPromise.lastName;
                    const fieldPosition = playerPromise.fieldPosition;
                    const jerseyNumber = playerPromise.jerseyNumber;
                    const onField = playerPromise.onField;
                    const player = {
                        id: id,
                        firstName: firstName,
                        lastName: lastName,
                        fieldPosition: fieldPosition,
                        jerseyNumber: jerseyNumber,
                        onField: onField
                    }
                    players = [...players, player];
                }
            }
            else {
                playerIds = null;
            }
            if (teamName == undefined) {
                teamName = null;
            }
            if (teamOfficialIds != null && teamOfficialIds != undefined) {
                teamOfficialIds.forEach((doc: { id: any; }) => {
                    let official = doc.id;
                    teamOfficials = [...teamOfficials, official];
                });
            }
            else {
                teamOfficialIds = null;
            }
            let team = {
                id: teamId,
                clubId: clubId,
                county: county,
                gradeId: gradeId,
                grade: grade,
                playerIds: playerIds,
                players: players,
                teamOfficialIds: teamOfficialIds,
                teamOfficials: teamOfficials,
                name: name,
                teamName: teamName,
                sport: sport
            }
            return team
        }
        return;
    } catch (e) {
        console.log("getTeam exception: " + e);
        return
    }
}

/*
Retrieve grade details from firestore
*/
let getGrade = async (gradeId: string) => {
    try {
        const gradeDoc = db.collection("Grade").doc(gradeId);
        const doc = await gradeDoc.get();
        if (doc.exists) {
            let level = doc.data().level;
            if (level == undefined) {
                level = null;
            }
            let name = doc.data().name;
            if (name == undefined) {
                name = null;
            }
            const grade = {
                level: level,
                name: name
            }
            return grade;
        }
        return;
    } catch (e) {
        console.log("getGrade exception: " + e);
        return
    }
}

/*
Retrieve venue details from firestore
*/
let getVenue = async (venueId: string) => {
    try {
        const venueDoc = db.collection("Venue").doc(venueId);
        const doc = await venueDoc.get();
        if (doc.exists) {
            let name = doc.data().name;
            if (name == undefined) {
                name = null;
            }
            let lat = doc.data().lat;
            if (lat == undefined) {
                lat = null;
            }
            let lng = doc.data().lng;
            if (lng == undefined) {
                lng = null;
            }
            let clubId = doc.data().club;
            if (clubId != null && clubId != undefined) {
                clubId = clubId.id;
            }
            else {
                clubId = null;
            }
            let county = doc.data().county;
            if (county != null || county != undefined) {
                county = county.id;
            }
            else {
                county = null;
            }

            const venue = {
                id: venueId,
                clubId: clubId,
                county: county,
                name: name,
                lat: lat,
                lng: lng
            }
            return venue;
        }
        return;
    } catch (e) {
        console.log("getVenue exception: " + e);
        return
    }
}

/*
Retrieve Club details from firestore
*/
let getClubDetails = async (clubId: string) => {
    try {
        const club = db.collection("Club").doc(clubId);
        const doc = await club.get();
        let club_crest: string;
        let name: string;
        if (doc.exists) {
            countyId = doc.data().county.id;
            club_crest = doc.data().crest;
            name = doc.data().name;

            if (countyId != null && countyId != undefined) {
                try {
                    countyName.set(countyId);
                } catch (e) {
                    console.log(`countyName exception ${e}`);
                }
            }
            if (club_crest != null && club_crest != undefined) {
                try {
                    crest.set(club_crest);
                } catch (e) {
                    console.log(`clubCrest exception ${e}`);
                }
            }
            if (name != null && name != undefined) {
                try {
                    clubName.set(name);
                } catch (e) {
                    console.log(`clubName exception ${e}`);
                }
            }
        }
        return true;
    } catch (e) {
        console.log("getClubDetails exception: " + e);
        return
    }
}

/*
Retrieve County details from firestore
*/
let getCountyDetails = async (countyId: string) => {
    try {
        const county = db.collection("County").doc(countyId);
        const doc = await county.get();
        if (doc.exists) {
            let crest = doc.data().crest;
            let province = doc.data().province.id;
            if (crest != null && crest != undefined) {
                countyCrest.set(crest);
            }
            if (province != null && province != undefined) {
                provinceName.set(province);
            }
        }
        return true;
    } catch (e) {
        console.log("getCountyDetails exception: " + e);
        return
    }
}

/**
Retrieve Players details from firestore 
 */
let getPlayerDetails = async (gameId: string, teamId: string, playerId: string) => {
    try {

        let member = await getMemberName(playerId);
        let firstName = member.firstName;
        let lastName = member.lastName;

        const playerDoc = db.collection("Game").doc(gameId).collection("teamsheet").doc(teamId).collection("players").doc(playerId);
        const doc = await playerDoc.get();

        if (doc.exists) {
            let id = doc.id;
            let fieldPosition = doc.data().fieldPosition;
            let jerseyNumber = doc.data().jerseyNumber;
            let onField = doc.data().onField;
            const player = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                fieldPosition: fieldPosition,
                jerseyNumber: jerseyNumber,
                onField: onField
            }

            return player;
        }
        else {
            const player = {
                id: playerId,
                firstName: firstName,
                lastName: lastName,
                fieldPosition: null,
                jerseyNumber: null,
                onField: null
            }
            return player;

        }

    } catch (e) {
        console.log("getPlayerDetails exception: " + e);
        return
    }
}

// Retrieve substitutes from a game for the match report
export let getMatchSubstitutes = async (gameId: string) => {

    const gameRef = db.collection("Game").doc(gameId);

    const subs = await db.collection("Substitute")
        .where("game", "==", gameRef).get();
    return subs;
}

// Retrieve cards from a game for the match report
export let getMatchCards = async (gameId: string) => {
    const gameRef = db.collection("Game").doc(gameId);

    const cards = await db.collection("Cards")
        .where("game", "==", gameRef).get();
    return cards;
}

// Retrieve injuries from a game for the match report

export let getInjuries = async (gameId: string) => {
    const gameRef = db.collection("Game").doc(gameId);
    const injuries = db.collection("Injury")
        .where("game", "==", gameRef).get();
    return injuries;
}

export let getMatchReportExtraDetails = async (gameId: string) => {
    let game = await db.collection("Game").doc(gameId).get();
    let teamATookToField = convertTimestampToTime(game.data().teamATookToField);
    let teamBTookToField = convertTimestampToTime(game.data().teamBTookToField);
    let matchStarted = convertTimestampToTime(game.data().matchStarted);
    let matchEnded = convertTimestampToTime(game.data().matchEnded);
    let teamATotalGoals = game.data().teamATotalGoals;
    let teamBTotalGoals = game.data().teamBTotalGoals;
    let teamATotalPoints = game.data().teamATotalPoints;
    let teamBTotalPoints = game.data().teamBTotalPoints;
    let delayInStart = game.data().delayInStart;
    let matchProgramme = game.data().matchProgramme;
    let jerseyNumbered = game.data().jerseyNumbered;
    let linesmenAttire = game.data().linesmenAttire;
    let pitchMarked = game.data().pitchMarked;
    let grassCut = game.data().grassCut;
    let extraComments = game.data().extraComments;
    let additionalGameDetails = {
        teamATookToField: teamATookToField,
        teamBTookToField: teamBTookToField,
        teamATotalGoals: teamATotalGoals,
        teamATotalPoints: teamATotalPoints,
        teamBTotalGoals: teamBTotalGoals,
        teamBTotalPoints: teamBTotalPoints,
        matchStarted: matchStarted,
        matchEnded: matchEnded,
        delayInStart: delayInStart,
        matchProgramme: matchProgramme,
        jerseyNumbered: jerseyNumbered,
        linesmenAttire: linesmenAttire,
        pitchMarked: pitchMarked,
        grassCut: grassCut,
        extraComments: extraComments
    }
    return additionalGameDetails;

}

// Creating Games 

// Get all national venues
export let getNationalVenues = async () => {
    try {
        let venues = [];
        const venueDocs = await db.collection("Venue").where("club", "==", null).get();
        venueDocs.forEach((doc) => {
            const id = doc.id;
            const clubOrCountyId = doc.data().county.id;
            const name = doc.data().name;
            const lat = doc.data().lng;
            const lng = doc.data().lng;
            const venue = {
                id: id,
                clubOrCountyId: clubOrCountyId,
                name: name,
                lat: lat,
                lng: lng,

            }
            venues = [...venues, venue];
        });
        return venues;
    } catch (E) {
        console.error(`getNationalTeams Exception: ${E}`);
    }
}

// get all national competitions
export let getNationalCompetitions = async () => {
    try {
        let competitions = [];
        let competitionDocs = await db.collection("Competition").where("isNational", "==", true).get();
        competitionDocs.forEach((doc) => {
            let id = doc.id;
            let countyId = doc.data().county;
            if (countyId != null) {
                countyId = countyId.id;
            }
            let gradeId = doc.data().grade.id;
            let isNational = doc.data().isNational;
            let name = doc.data().name;
            let provinceId = doc.data().province;
            if (provinceId != null) {
                provinceId = provinceId.id;
            }
            let sportTypeId = doc.data().sportType.id;

            let comp = {
                id: id,
                countyId: countyId,
                gradeId: gradeId,
                isNational: isNational,
                name: name,
                provinceId: provinceId,
                sportTypeId: sportTypeId
            }
            competitions = [...competitions, comp];
        });
        return competitions;
    } catch (e) {
        console.log("getNationalCompetition exception " + e);
    }
}

// Get all national counties
export let getNationalTeams = async () => {
    try {
        let counties = [];
        let teams = [];
        let countyDocs = await db.collection("County").get();
        countyDocs.forEach((doc) => {
            let id = doc.id;
            let countyRef = db.collection("County").doc(id);

            counties = [...counties, countyRef];
        });
        if (counties.length > 0) {
            let teamDocs = await db.collection("Team").where("county", "in", counties).get();
            teamDocs.forEach((doc) => {
                let id = doc.id;
                let name = doc.data().name;
                let team = { id: id, name: name };
                teams = [...teams, team];
            });
        }
        return teams;
    } catch (e) {
        console.error(`getNationalTeams exception ${e}`);
    }
}

// Get all national referees
export let getNationalReferees = async () => {
    try {

        let referees = [];
        let memberDocs = await db.collection("Member").where("refereeOfCounty", "==", true).get();


        for (let i = 0; i < memberDocs.size; i++) {
            let doc = memberDocs.docs[i];
            let id = doc.id;
            let name = `${doc.data().firstName} ${doc.data().lastName}`;
            let clubId = doc.data().ownClub.id;
            let clubDoc = await db.collection("Club").doc(clubId).get();
            let countyId = clubDoc.data().county.id;

            let ref = {
                id: id,
                name: name,
                clubId: clubId,
                countyId: countyId
            };
            referees = [...referees, ref];

        }
        return referees;

    } catch (e) {
        console.error(`getNationalReferees exception ${e}`);
    }
}

// Get a users Province Id
export let getProvinceId = async (clubId: string) => {
    try {
        let clubDoc = await db.collection("Club").doc(clubId).get();
        let countyDoc = await db.collection("County").doc(clubDoc.data().county.id).get();
        let provinceId = countyDoc.data().province.id;
        return provinceId;
    } catch (e) {
        console.error(`getProvinceId exception ${e}`);
    }
}
//  get the  county Refs of a province
export let getCountyRefsOfProvince = async (provinceId: string) => {
    try {
        let countyRefs = []
        let provinceRef = db.collection("Province").doc(provinceId);
        let countyDocs = await db.collection("County").where("province", "==", provinceRef).get();
        countyDocs.forEach((doc) => {
            let countyRef = db.collection("County").doc(doc.id);
            countyRefs = [...countyRefs, countyRef];
        });
        return countyRefs;
    } catch (e) {
        console.error(`getCountyRefsOfProvince exception ${e}`);
    }
}

// get the county venues within a province
export let getProvincialVenues = async (countyIds: []) => {
    try {
        let venues = [];
        let venueDocs = await db.collection("Venue").where("county", "in", countyIds).get();
        venueDocs.forEach((doc) => {
            const venueId = doc.id;
            const clubOrCountyId = doc.data().county.id;
            const name = doc.data().name;
            const lat = doc.data().lng;
            const lng = doc.data().lng;
            const venue = {
                venueId: venueId,
                clubOrCountyId: clubOrCountyId,
                name: name,
                lat: lat,
                lng: lng,

            }
            venues = [...venues, venue];
        });

        return venues;
    } catch (e) {
        console.error(`getProvincialVenue exception ${e}`);
    }
}

export let getProvincialTeams = async (countyRefs: any[]) => {
    try {
        let teams = [];

        for (let i = 0; i < countyRefs.length; i++) {
            let teamDoc = await db.collection("County").doc(countyRefs[i].id).get();
            let id = teamDoc.id;
            let name = id;
            let team = { id: id, name: name };
            teams = [...teams, team];
        }

        return teams;
    } catch (e) { console.error(`getProvincialTeams exception ${e}`); }
}

export let getProvincialClubReferences = async (countyReferences: any[]) => {
    try {
        let clubReferences = [];
        for (let i = 0; i < countyReferences.length; i++) {
            let clubDoc = await db.collection("Club").doc(countyReferences[i].id).get();
            let clubReference = db.collection("Club").doc(clubDoc.id);
            clubReferences = [...clubReferences, clubReference];
        }
        return (clubReferences);
    } catch (e) {
        console.log(`getProvincialClubReferences exception ${e}`)
    }
}
export let getProvincialReferees = async (clubReferences: any[]) => {
    try {
        let referees = [];

        if (clubReferences.length > 0) {
            let memberDocs = await db.collection("Member").where("ownClub", "in", clubReferences).where("refereeOfCounty", "==", true).get();
            for (let i = 0; i < memberDocs.size; i++) {
                let doc = memberDocs.docs[i];
                let id = doc.id;
                let name = `${doc.data().firstName} ${doc.data().lastName}`;
                let clubId = doc.data().ownClub.id;
                let clubDoc = await db.collection("Club").doc(clubId).get();
                let countyId = clubDoc.data().county.id;

                let ref = {
                    id: id,
                    name: name,
                    clubId: clubId,
                    countyId: countyId
                };
                referees = [...referees, ref];

            }
        }
        return referees;

    } catch (e) {
        console.error(`getProvincialReferees exception ${e}`);
    }
}
let getMembersCountyDetails = async (clubId: string) => {
    const club = await db.collection("Club").doc(clubId).get();
    const countyRef = club.data().county;
    const county = await db.collection("County").doc(countyRef.id).get();
    return county;
}

let getMembersClubDetails = async (clubId: string) => {
    const club = await db.collection("Club").doc(clubId).get();
    return club;
}




// Get Competitions of A province
export let getProvincialCompetitions = async (provinceId: string) => {
    try {
        let competitions = [];
        if (provinceId != null && provinceId != undefined) {
            let provinceRef = db.collection("Province").doc(provinceId);
            let competitionDocs = await db.collection("Competition").where("isProvincial", "==", provinceRef).get()
            competitionDocs.forEach((doc) => {

                let id = doc.id;
                let countyId = doc.data().county;
                if (countyId != null) {
                    countyId = countyId.id;
                }
                let gradeId = doc.data().grade.id;
                let isNational = doc.data().isNational;
                let name = doc.data().name;
                let sportTypeId = doc.data().sportType.id;

                let comp = {
                    id: id,
                    countyId: countyId,
                    gradeId: gradeId,
                    isNational: isNational,
                    name: name,
                    provinceId: provinceId,
                    sportTypeId: sportTypeId
                }
                competitions = [...competitions, comp];
            });
        }
        return competitions;
    } catch (e) {
        console.error(`getProvincialCompetitions exception ${e}`);
    }
}

let getCountyCompetitions = async (countyId: string) => {
    let countyRef = db.collection("County").doc(countyId);
    let competitions = await db.collection("Competition").where("county", "==", countyRef).get();

    return competitions
}


// Create Game
export let createGameInFirestore = async (memberId: string, date: any, time: any, venueId: string, competitionId: string,
    teamAId: string, teamBId: string, refereeId: string, subReferee: string, linesman1: any, linesman2: any,
    umpire1: any, umpire2: any, umpire3: any, umpire4: any) => {
    try {
        let referee = null
        if (refereeId != null && refereeId != undefined) {
            referee = db.collection("Member").doc(refereeId);
        }
        let secretary = null;
        if (memberId != undefined && memberId != null) {
            secretary = db.collection("Member").doc(memberId);
        }
        let substituteReferee = null;
        if (subReferee != "null") {
            console.log(`Sub Ref: ${subReferee}`);
            substituteReferee = db.collection("Member").doc(subReferee);
        }
        let competition = null;
        if (competitionId != undefined && competitionId != null) {
            competition = db.collection("Competition").doc(competitionId);
        }
        let venue = null;
        if (venueId != undefined && venueId != null) {
            venue = db.collection("Venue").doc(venueId);
        }
        let teamA = null;
        if (teamAId != undefined && teamAId != null) {
            teamA = db.collection("Team").doc(teamAId);
        }
        let teamB = null;
        if (teamBId != undefined && teamBId != null) {
            teamB = db.collection("Team").doc(teamBId);
        }

        let clubOrCounties = [teamA, teamB];
        let linesmen = [];
        if (linesman1 != "" || linesman2 != "") {
            linesmen = [linesman1, linesman2];
        }
        let umpires = []
        if (umpire1 != "" || umpire2 != "" || umpire3 != "" || umpire4 != "") {
            let umpires = [umpire1, umpire2, umpire3, umpire4];
        }

        let delayInStart = "";
        let extraComments = "";
        let grassCut = null;
        let jerseyNumbered = null;
        let linesmenAttire = "";
        let matchEnded = null;
        let matchStarted = null;
        let pitchMarked = null;
        let teamATotalGoals = 0;
        let teamATotalPoints = 0;
        let teamBTotalGoals = 0;
        let teamBTotalPoints = 0;
        let teamATookToField = null;
        let teamBTookToField = null;
        let dateTimeString = `${date} ${time}`;
        const dateTime = new Date(dateTimeString);
        let game = {
            referee: referee,
            secretary: secretary,
            substituteReferee: substituteReferee,
            competition: competition,
            venue: venue,
            teamA: teamA,
            teamB: teamB,
            clubsOrCounties: clubOrCounties,
            linesmen: linesmen,
            umpires: umpires,
            delayInStart: delayInStart,
            extraComments: extraComments,
            grassCut: grassCut,
            jerseyNumbered: jerseyNumbered,
            linesmenAttire: linesmenAttire,
            matchEnded: matchEnded,
            matchStarted: matchStarted,
            pitchMarked: pitchMarked,
            teamATotalGoals: teamATotalGoals,
            teamBTotalGoals: teamBTotalGoals,
            teamATotalPoints: teamATotalPoints,
            teamBTotalPoints: teamBTotalPoints,
            teamATookToField: teamATookToField,
            teamBTookToField: teamBTookToField,
            dateTime: dateTime
        }
        console.log(game);
        let newGame = db.collection("Game").doc();
        newGame.set(game);
    } catch (e) {
        console.error(`createGameInFirestore exception ${e}`);
    }
}



// export let copyCreateGame = async (doc) => {
//     try {
//         let gameId = doc.id;
//         console.log("id: " + doc.id)
//         let secretaryDoc = doc.data().secretary;
//         console.log("Sec Doc ID " + secretaryDoc.id);
//         let competitionId = doc.data().competition;
//         console.log("competition Id :" + competitionId.id)
//         let competition = {};
//         let dateTime = doc.data().dateTime;
//         console.log("date time " + dateTime);
//         let linesmen = doc.data().linesmen;
//         console.log("linesmen: " + linesmen);
//         let umpires = doc.data().umpires;
//         console.log("umpires: " + umpires);
//         let refereeId = doc.data().referee;
//         console.log("referee Id" + refereeId);
//         let referee: {};
//         let substituteRefereeId = doc.data().substituteReferee;
//         console.log("Sub Ref Id:L " + substituteRefereeId)
//         let substituteReferee: {};
//         let teamAId = doc.data().teamA;
//         console.log("teamAId " + teamAId.id);
//         let teamA = {};
//         let teamB = {};
//         let teamBId = doc.data().teamB;
//         console.log("TeamBId : " + teamBId.id);
//         let venueId = doc.data().venue;
//         console.log("venueId: " + venueId);

//         let teamATookToField = doc.data().teamATookToFieldAt;
//         console.log("teamATookToField: " + teamATookToField);
//         let teamBTookToField = doc.data().teamBTookToFieldAt;
//         console.log("teamBTookTo the Field: " + teamBTookToField)
//         let matchStarted = doc.data().matchStarted;
//         let matchEnded = doc.data.matchEnded;
//         console.log("game started at : " + matchStarted);
//         console.log("game ended at  " + matchEnded);
//         let venue = {};
//         let time: any;
//         let date: any;
//         let secretaryId: string = "";
//         try {
//             if (teamATookToField == null || teamATookToField == undefined) {
//                 teamATookToField = "";
//             }
//             else {
//                 teamATookToField = convertTimestampToTime(teamATookToField);
//             }
//         } catch (e) { console.log("teamATookToField exception " + e) };


//         try {
//             if (teamBTookToField == null || teamBTookToField == undefined) {
//                 teamBTookToField = "";
//             }
//             else {
//                 teamBTookToField = convertTimestampToTime(teamBTookToField);
//             }
//         } catch (e) {
//             console.log("teamBTookToTheField Exception: " + e);
//         }

//         try {
//             if (matchStarted == null || matchStarted == undefined) {
//                 matchStarted = "";
//             }
//             else {
//                 matchStarted = convertTimestampToTime(matchStarted);
//             }
//         } catch (e) {
//             console.log("matchStarted exception" + e);
//         }

//         try {
//             if (matchEnded == null || matchEnded == undefined) {
//                 matchEnded = "";
//             }
//             else {
//                 matchEnded = convertTimestampToTime(matchEnded);
//             }
//         } catch (e) {
//             console.log("matchEnded Exception: " + e);
//         }

//         try {
//             if (secretaryDoc != null && secretaryDoc != undefined) {
//                 secretaryId = secretaryDoc.id;
//             }
//         } catch (e) {
//             console.log("SecretaryDoc exception" + e);
//         }
//         try {
//             if (competitionId != null && competitionId != undefined) {
//                 competitionId = competitionId.id
//                 const compPromise = await getCompetition(competitionId);
//                 let id = compPromise.id;
//                 const county = compPromise.county;
//                 const province = compPromise.province;
//                 const isNational = compPromise.isNational;
//                 const name = compPromise.name;
//                 const sport = compPromise.sport;
//                 let gradeId = compPromise.gradeId;
//                 let grade = compPromise.grade;
//                 competition = {
//                     id: id,
//                     county: county,
//                     province: province,
//                     isNational: isNational,
//                     name: name,
//                     sport: sport,
//                     gradeId: gradeId,
//                     grade: grade
//                 }
//             }
//             else {
//                 competitionId = null;
//                 competition = null;
//             }
//         } catch (e) {
//             console.log("Competition exception" + e);
//         }
//         try {
//             if (dateTime == undefined) {
//                 dateTime = null;
//             }
//             else {
//                 date = convertTimestampToDate(dateTime);
//                 time = convertTimestampToTime(dateTime);
//             }
//         } catch (e) {
//             console.log("dateTime exception" + e);
//         }
//         try {
//             if (linesmen == undefined) {
//                 linesmen = [];
//             }
//         } catch (e) {
//             console.log("Linesmen exception " + e);
//         }
//         try {
//             if (refereeId != null && refereeId != undefined) {
//                 refereeId = refereeId.id;
//                 console.log(`Referee Id ${refereeId}`);
//                 const refPromise = await getRefereeNameAndAddress(refereeId);
//                 let firstName = refPromise.firstName;
//                 let lastName = refPromise.lastName;
//                 let addressLine1 = refPromise.addressLine1;
//                 let addressLine2 = refPromise.addressLine2;
//                 let town = refPromise.town;
//                 let county = refPromise.county;
//                 let eircode = refPromise.eircode;
//                 let id = refPromise.id;


//                 referee = {
//                     id: id,
//                     firstName: firstName,
//                     lastName: lastName,
//                     addressLine1: addressLine1,
//                     addressLine2: addressLine2,
//                     town: town,
//                     county: county,
//                     eircode: eircode

//                 };
//             }
//             else {
//                 refereeId = null;
//             }
//         } catch (e) {
//             console.log("refereeId exception" + e);
//         }
//         try {
//             if (substituteRefereeId != null && substituteRefereeId != undefined) {
//                 substituteRefereeId = substituteRefereeId.id;
//                 const subRefPromise = await getMemberName(substituteRefereeId);
//                 let firstName = subRefPromise.firstName;
//                 let lastName = subRefPromise.lastName;
//                 let id = subRefPromise.id
//                 substituteReferee = {
//                     id: id,
//                     firstName: firstName,
//                     lastName: lastName
//                 };
//             }
//             else {
//                 substituteRefereeId = null;
//             }
//         } catch (e) {
//             console.log("Substitute Referee Id " + e);
//         }

//         try {
//             if (teamAId != null && teamAId != undefined) {
//                 teamAId = teamAId.id;
//                 console.log(`TeamAId ${teamAId}`);
//                 const teamAPromise = await getTeam(gameId, teamAId);
//                 console.log(`TeamAPromise : ` + teamAPromise);

//                 const id = teamAPromise.id;
//                 const clubId = teamAPromise.clubId;
//                 const county = teamAPromise.county;
//                 const gradeId = teamAPromise.gradeId;
//                 const grade = teamAPromise.grade;
//                 const name = teamAPromise.name;
//                 const players = teamAPromise.players;
//                 const sport = teamAPromise.sport;
//                 const teamName = teamAPromise.teamName;
//                 const teamOfficialIds = teamAPromise.teamOfficialIds;
//                 const teamOfficials = teamAPromise.teamOfficials;
//                 teamA = {
//                     id: id,
//                     clubId: clubId,
//                     county: county,
//                     gradeId: gradeId,
//                     grade: grade,
//                     name: name,
//                     players: players,
//                     sport: sport,
//                     teamName: teamName,
//                     teamOfficialIds: teamOfficialIds,
//                     teamOfficials: teamOfficials,
//                 }
//             }
//             else {
//                 teamAId = null;
//             }
//         } catch (e) {
//             console.log("TeamAId exception" + e);
//         }
//         try {
//             if (teamBId != null && teamBId != undefined) {
//                 teamBId = teamBId.id;
//                 console.log("teamBId: " + teamBId);
//                 const teamBPromise = await getTeam(gameId, teamBId);
//                 console.log(`teamAPromise ${teamBPromise}`);
//                 const id = teamBPromise.id;
//                 const clubId = teamBPromise.clubId;
//                 const county = teamBPromise.county;
//                 const gradeId = teamBPromise.gradeId;
//                 const grade = teamBPromise.grade;
//                 const name = teamBPromise.name;
//                 const playerIds = teamBPromise.playerIds;
//                 const players = teamBPromise.players;
//                 const sport = teamBPromise.sport;
//                 const teamName = teamBPromise.teamName;
//                 const teamOfficialIds = teamBPromise.teamOfficialIds;
//                 const teamOfficials = teamBPromise.teamOfficials;
//                 teamB = {
//                     id: id,
//                     clubId: clubId,
//                     county: county,
//                     gradeId: gradeId,
//                     grade: grade,
//                     name: name,
//                     playerIds: playerIds,
//                     players: players,
//                     sport: sport,
//                     teamName: teamName,
//                     teamOfficialIds: teamOfficialIds,
//                     teamOfficials: teamOfficials,
//                 }

//             }
//             else {
//                 teamBId = null;
//             }
//         } catch (e) {
//             console.log("teamBid exception" + e);
//         }

//         try {
//             if (venueId != null && venueId != undefined) {
//                 venueId = venueId.id;
//                 const venuePromise = await getVenue(venueId);
//                 const id = venuePromise.id;
//                 const name = venuePromise.name;
//                 const lat = venuePromise.lat;
//                 const lng = venuePromise.lng;
//                 let clubId = venuePromise.clubId;
//                 const county = venuePromise.county;

//                 venue = {
//                     id: id,
//                     name: name,
//                     lat: lat,
//                     lng: lng,
//                     clubId: clubId,
//                     county: county
//                 }

//             }
//             else {
//                 venueId = null
//             }
//         }
//         catch (e) {
//             console.log("VenueID exception " + e);
//         }
//         const game = {
//             gameId: gameId,
//             secretaryId: secretaryId,
//             competition: competition,
//             date: date,
//             time: time,
//             dateTime: dateTime,
//             linesmen: linesmen,
//             referee: referee,
//             substituteReferee: substituteReferee,
//             teamA: teamA,
//             teamB: teamB,
//             umpires: umpires,
//             venue: venue,
//             teamATookToField: teamATookToField,
//             teamBTookToField: teamBTookToField,
//             matchStarted: matchStarted,
//             matchEnded: matchEnded
//         }
//         return game;
//     } catch (e) {
//         console.log("createGame exception: " + e);
//         return
//     }
// }
