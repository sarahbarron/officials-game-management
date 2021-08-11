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

const member = db.collection('Member');

let clubId: string;
let countyId: string;
let allgames = [];

/* Retrieve member details, club details and county details
*/
export let getMember = async (email: string) => {
    console.log("getMember: " + email);
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
    console.log(`getMemberDetails: ${email}`);
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
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;

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
                gameStartedAt: gameStartedAt,
                gameEndedAt: gameEndedAt
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
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;

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
                gameStartedAt: gameStartedAt,
                gameEndedAt: gameEndedAt
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
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;
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
                gameStartedAt: gameStartedAt,
                gameEndedAt: gameEndedAt
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
            let teamATookToField = gamePromise.teamATookToTheField;
            let teamBTookToField = gamePromise.teamBTookToTheField;
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;
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
                teamATookToField,
                teamBTookToField,
                gameStartedAt,
                gameEndedAt
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
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;

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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let teamATookToField = gamePromise.teamATookToTheField;
                let teamBTookToField = gamePromise.teamBTookToTheField;
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt

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
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let teamATookToField = gamePromise.teamATookToTheField;
                let teamBTookToField = gamePromise.teamBTookToTheField;
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

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
                let teamATookToField = gamePromise.teamATookToTheField;
                let teamBTookToField = gamePromise.teamBTookToTheField;
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt,

                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

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
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;
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
                gameStartedAt: gameStartedAt,
                gameEndedAt: gameEndedAt
            }
            // const game = convertPromiseToGameObject(gamePromise);

            if (!games.includes(game)) {
                games = [...games, game];
                allgames = [...allgames, game];

            }
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
            let teamATookToField = gamePromise.teamATookToTheField;
            let teamBTookToField = gamePromise.teamBTookToTheField;
            let gameStartedAt = gamePromise.gameStartedAt;
            let gameEndedAt = gamePromise.gameEndedAt;
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
                gameStartedAt: gameStartedAt,
                gameEndedAt: gameEndedAt
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
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let teamATookToField = gamePromise.teamATookToTheField;
                let teamBTookToField = gamePromise.teamBTookToTheField;
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
                let teamATookToField = gamePromise.teamATookToTheField;
                let teamBTookToField = gamePromise.teamBTookToTheField;
                let gameStartedAt = gamePromise.gameStartedAt;
                let gameEndedAt = gamePromise.gameEndedAt;
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
                    gameStartedAt: gameStartedAt,
                    gameEndedAt: gameEndedAt
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
        let teamATookToTheField = doc.data().teamATookToTheFieldAt;
        let teamBTookToTheField = doc.data().teamBTookToTheFieldAt;
        let gameStartedAt = doc.data().gameStartedAt;
        let gameEndedAt = doc.data().gameEndedAt;
        let venue = {};
        let time;
        let date;
        let secretaryId: string = "";

        if (teamATookToTheField == null || teamATookToTheField == undefined) {
            teamATookToTheField = "";
        }
        else {
            teamATookToTheField = convertTimestampToTime(teamATookToTheField);
        }
        if (teamBTookToTheField == null || teamBTookToTheField == undefined) {
            teamBTookToTheField = "";
        }
        else {
            teamBTookToTheField = convertTimestampToTime(teamBTookToTheField);
        }
        if (gameStartedAt == null || gameStartedAt == undefined) {
            gameStartedAt = "";
        }
        else {
            gameStartedAt = convertTimestampToTime(gameStartedAt);
        }
        if (gameEndedAt == null || gameEndedAt == undefined) {
            gameEndedAt = "";
        }
        else {
            gameEndedAt = convertTimestampToTime(gameEndedAt);
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
            teamATookToTheField: teamATookToTheField,
            teamBTookToTheField: teamBTookToTheField,
            gameStartedAt: gameStartedAt,
            gameEndedAt: gameEndedAt
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
        const teamDoc = db.collection("Team").doc(teamId);
        const doc = await teamDoc.get();

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
                teamOfficialIds.forEach(doc => {
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

let GetMembersProvinceDetails = async (clubId) => {
    const club = await db.collection("Club").doc(clubId).get();
    const countyRef = club.data().county;
    const county = await db.collection("County").doc(countyRef.id).get();
    const provinceRef = county.data().province;
    const province = await db.collection("Province").doc(provinceRef.id).get();
    return province;

}

let getMembersCountyDetails = async (clubId) => {
    const club = await db.collection("Club").doc(clubId).get();
    const countyRef = club.data().county;
    const county = await db.collection("County").doc(countyRef.id).get();
    return county;
}

let getMembersClubDetails = async (clubId) => {
    const club = await db.collection("Club").doc(clubId).get();
    return club;
}
let getAllCounties = async () => {
    let counties = await db.collection("County").get();
    return counties;
}

let getNationalCompetitons = async () => {
    let competitions = await db.collection("Competition").where("isNational", "==", true).get();
    return competitions;
}


let getProvincialCompetitions = async (provinceId: string) => {
    let provinceRef = db.collection("Province").doc(provinceId);
    let competitions = await db.collection("Competition").where("province", "==", provinceRef).get()
    return competitions
}

let getCountyCompetitions = async (countyId: string) => {
    let countyRef = db.collection("County").doc(countyId);
    let competitions = await db.collection("Competition").where("county", "==", countyRef).get()
    return competitions
}
