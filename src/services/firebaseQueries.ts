import {
    userEmail, memberDocument,
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
let getMemberDetails = async (email: string) => {
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
                memberDocument.set(memberDoc);
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
let getSecretaryOfClubUpcomingGames = async (clubId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
let getSecretaryOfClubPastGames = async (clubId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
let getSecretaryOfCountyUpcomingCountyGames = async (clubId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
let getSecretaryOfCountyPastCountyGames = async (clubId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
let getSecretaryOfCountyUpcomingClubGames = async (clubId: string) => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
let getSecretaryOfCountyPastClubGames = async (clubId: string) => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
let getSecretaryOfProvinceUpcomingGames = async (clubId: string) => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secProvinceUpcomingGames.set(games);
                    allGames.set(allgames);
                    console.log(`secProvinceUpcomingGames set`);
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
let getSecretaryOfProvincePastGames = async (clubId: string) => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
let getSecretaryOfCouncilUpcomingGames = async () => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
let getSecretaryOfCouncilPastGames = async () => {
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
                }
                // const game = convertPromiseToGameObject(gamePromise);


                if (!games.includes(game)) {
                    games = [...games, game];
                    allgames = [...allgames, game];

                }
                if (games != null && games != undefined && i == (querySnapshot.size - 1)) {
                    secCouncilPastGames.set(games);
                    allGames.set(allgames);
                    console.log(`secCouncilPastGames set`);
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
let getRefereeUpcomingGames = async (memberId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
let getRefereePastGames = async (memberId: string) => {
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
            // let dateTime = gamePromise.dateTime;
            let date = gamePromise.date;
            let time = gamePromise.time;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                id: id,
                competition: competition,
                // dateTime: dateTime,
                date: date,
                time: time,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
                // let dateTime = gamePromise.dateTime;
                let date = gamePromise.date;
                let time = gamePromise.time;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    date: date,
                    time: time,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
                // let dateTime = gamePromise.dateTime;
                let linesmen = gamePromise.linesmen;
                let umpires = gamePromise.umpires;
                let referee = gamePromise.referee;
                let substituteReferee = gamePromise.substituteReferee;
                let teamA = gamePromise.teamA;
                let teamB = gamePromise.teamB;
                let venue = gamePromise.venue;
                const game = {
                    id: id,
                    competition: competition,
                    // dateTime: dateTime,
                    linesmen: linesmen,
                    umpires: umpires,
                    referee: referee,
                    substituteReferee,
                    teamA: teamA,
                    teamB: teamB,
                    venue: venue
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
extract all details about a game from firestore and create a game
in the svelte store will all the details
*/
export let createGame = async (doc) => {
    try {
        let gameId = doc.id;
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
        let venue = {};
        let time;
        let date;

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
            console.log(`Create Game ${date}`)
            time = convertTimestampToTime(dateTime);
            console.log(`Create Game ${time}`);
        }
        if (linesmen == undefined) {
            linesmen = null;
        }
        if (refereeId != null && refereeId != undefined) {
            refereeId = refereeId.id;
            const refPromise = await getMemberName(refereeId);
            let firstName = refPromise.firstName;
            let lastName = refPromise.lastName;
            let id = refPromise.id;

            referee = {
                id: id,
                firstName: firstName,
                lastName: lastName

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
            venue: venue
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

let convertTimestampToDate = (timestamp) => {
    try {
        if (timestamp != null && timestamp != undefined) {
            let date = timestamp.toDate();
            date = date.toDateString();
            return date;
        }
        else {
            return "";
        }
    }
    catch (e) {
        console.log("convertTimestampToDate exception: " + e);
    }
}

let convertTimestampToTime = (timestamp) => {
    try {
        if (timestamp != null && timestamp != undefined) {
            const date = timestamp.toDate();
            const hour = date.getHours();
            let mins = date.getMinutes();
            if (mins < 10) {
                mins = `${mins}0`;
            }
            const time = `${hour}:${mins}`;
            return time;
        }
        else {
            return "";
        }
    } catch (e) {
        console.log("convertTimestampToTime exception: " + e);
    }
}
