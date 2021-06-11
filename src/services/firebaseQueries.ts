
import {
    userEmail, memberDocument,
    refereeOfClub,
    refereeOfCounty, secretaryOfClub, secretaryOfCounty, secretaryOfProvince,
    secretaryOfCouncil, teamOfficial, firstName, lastName, clubRef, clubCrest, clubName,
    countyCrest, countyName, provinceName,
    refUpcomingGames
} from './storeUser';
import { db } from "./firebase";

const member = db.collection('Member');


let clubId: string;
let countyId: string;

export let getMember = async (email: string) => {
    console.log("getMember: " + email);
    try {
        await getMemberDetails(email);
        console.log("Own Club: " + clubId);
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

let getMemberDetails = async (email: string) => {
    console.log(`getMemberDetails: ${email}`);
    try {
        const querySnapshot = await member.where("email", "==", email).get()
        querySnapshot.forEach((doc) => {
            console.log("for each");

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
            }
            if (fName != null && fName != undefined) {
                firstName.set(fName);
            }
            if (lName != null && lName != undefined) {
                lastName.set(lName);
            }
            if (clubId != null && clubId != undefined) {
                clubRef.set(clubId);
            }

        });
        return true;
    } catch (e) {
        console.log("getMemberDetails exception: " + e);
        return
    }
}



export let getRefereeUpcomingGames = async (memberId: string) => {
    try {
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

            let competition = gamePromise.competition;
            let dateTime = gamePromise.dateTime;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let referee = gamePromise.referee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let venue = gamePromise.venue;
            const game = {
                competition: competition,
                dateTime: dateTime,
                linesmen: linesmen,
                umpires: umpires,
                referee: referee,
                substituteReferee,
                teamA: teamA,
                teamB: teamB,
                venue: venue
            }
            games = [...games, game];
            if (games != null && games != undefined) {
                refUpcomingGames.set(games);
            }
        });


        return;
    } catch (e) {
        console.log("getRefereeUpcomingGames exception: " + e);
        return
    }
}

export let getRefereesName = async (refId: string) => {
    try {
        const referee = db.collection("Member").doc(refId);
        const doc = await referee.get();
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
                id: refId,
                firstName: firstName,
                lastName: lastName
            }
            return name;
        }
        return;
    } catch (e) {
        console.log("getRefereeName exception: " + e);
        return
    }
}

export let createGame = async (doc) => {
    try {
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
        if (linesmen == undefined) {
            linesmen = null;
        }
        if (refereeId != null && refereeId != undefined) {
            refereeId = refereeId.id;
            const refPromise = await getRefereesName(refereeId);
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
            const subRefPromise = await getRefereesName(substituteRefereeId);
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
            const teamAPromise = await getTeam(teamAId);
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
            teamA = {
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
            teamAId = null;
        }
        if (teamBId != null && teamBId != undefined) {
            teamBId = teamBId.id;
            const teamAPromise = await getTeam(teamBId);
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
            gameId: doc.id,
            competition: competition,
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

            let province = doc.data().province;
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

export let getTeam = async (teamId: string) => {
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

let getClubDetails = async (clubId: string) => {
    try {
        const club = db.collection("Club").doc(clubId);
        const doc = await club.get();
        if (doc.exists) {
            countyId = doc.data().county.id;
            let crest = doc.data().crest;
            let name = doc.data().name;
            if (countyId != null && countyId != undefined) {
                countyName.set(countyId);
            }
            if (crest != null && crest != undefined) {
                clubCrest.set(crest);
            }
            if (name != null && name != undefined) {
                clubName.set(name);
            }
            console.log(`County Id: ${countyId}, Crest: ${crest}, Name: ${name}`);
        }
        return true;
    } catch (e) {
        console.log("getClubDetails exception: " + e);
        return
    }
}


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

            console.log(`Province: ${province}, Crest: ${crest}`);

        }
        return true;
    } catch (e) {
        console.log("getCountyDetails exception: " + e);
        return
    }
}
