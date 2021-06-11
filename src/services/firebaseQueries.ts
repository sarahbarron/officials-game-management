
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

            let competitionId = gamePromise.competitionId;
            let competition = gamePromise.competition;
            let dateTime = gamePromise.dateTime;
            let linesmen = gamePromise.linesmen;
            let umpires = gamePromise.umpires;
            let refereeId = gamePromise.refereeId;
            let referee = gamePromise.referee;
            let substituteRefereeId = gamePromise.substituteReferee;
            let substituteReferee = gamePromise.substituteReferee;
            let teamAId = gamePromise.teamAId;
            let teamA = gamePromise.teamA;
            let teamB = gamePromise.teamB;
            let teamBId = gamePromise.teamBId;
            let venueId = gamePromise.venueId;
            let venue = gamePromise.venue;
            const game = {
                competitionId: competitionId,
                competition: competition,
                dateTime: dateTime,
                linesmen: linesmen,
                umpires: umpires,
                refereeId: refereeId,
                referee: referee,
                substituteRefereeId,
                substituteReferee,
                teamAId: teamAId,
                teamA: teamA,
                teamB: teamB,
                teamBId: teamBId,
                venueId: venueId,
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
            let lastName = doc.data().lastName;
            let name = {
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
        let referee: string = "";
        let substituteRefereeId = doc.data().substituteReferee;
        let substituteReferee: string = "";
        let teamAId = doc.data().teamA;
        let teamA = {};
        let teamB = {};
        let teamBId = doc.data().teamB;
        let venueId = doc.data().venue;
        let venue = {};

        if (competitionId != null && competitionId != undefined) {
            competitionId = competitionId.id
            const compPromise = await getCompetition(competitionId);

            const county = compPromise.county;
            const province = compPromise.province;
            const isNational = compPromise.isNational;
            const name = compPromise.name;
            const sport = compPromise.sport;
            let gradeId = compPromise.gradeId;
            let grade = compPromise.grade;
            competition = {
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
            competitionId = "";
        }

        if (dateTime == null || dateTime == undefined) {
            dateTime = "";
        }
        if (linesmen == null || linesmen == undefined) {
            linesmen = "";
        }
        if (refereeId != null && refereeId != undefined) {
            refereeId = refereeId.id;
            const refPromise = await getRefereesName(refereeId);
            referee = `${refPromise.firstName} ${refPromise.lastName}`;
        }
        else {
            refereeId = "";
        }
        if (substituteRefereeId != null && substituteRefereeId != undefined) {
            substituteRefereeId = substituteRefereeId.id;
            const subRefPromise = await getRefereesName(substituteRefereeId);
            substituteReferee = `${subRefPromise.firstName}} ${subRefPromise.lastName}`;
        }
        else {
            substituteRefereeId = "";
        }
        if (teamAId != null && teamAId != undefined) {
            teamAId = teamAId.id;
            const teamAPromise = await getTeam(teamAId);
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
            teamAId = "";
        }
        if (teamBId != null && teamBId != undefined) {
            teamBId = teamBId.id;
            const teamAPromise = await getTeam(teamBId);
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
            teamBId = "";
        }
        if (venueId != null && venueId != undefined) {
            venueId = venueId.id;
            const venuePromise = await getVenue(venueId);
            const name = venuePromise.name
            const lat = venuePromise.lat;
            const lng = venuePromise.lng;
            let clubId = venuePromise.clubId;
            const county = venuePromise.county;

            venue = {
                name: name,
                lat: lat,
                lng: lng,
                clubId: clubId,
                county: county
            }

        }
        else {
            venueId = ""
        }


        const game = {
            gameId: doc.id,
            competitionId: competitionId,
            competition: competition,
            dateTime: dateTime,
            linesmen: linesmen,
            refereeId: refereeId,
            referee: referee,
            substituteRefereeId: substituteRefereeId,
            substituteReferee: substituteReferee,
            teamAId: teamAId,
            teamA: teamA,
            teamBId: teamBId,
            teamB: teamB,
            umpires: umpires,
            venueId: venueId,
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
            if (county == null || county == undefined) {
                county = "";
            }
            else {
                county = county.id;
            }

            let province = doc.data().province;
            if (province === null || province === undefined) {
                province = "";
            }
            let isNational = doc.data().isNational;
            if (isNational == null || isNational == undefined) {
                isNational = "";
            }

            let name = doc.data().name;
            if (name == null || name == undefined) {
                name = "";
            }

            let sport = doc.data().sportType;
            if (sport != null && sport != undefined) {
                sport = sport.id;
            }
            else {
                sport = "";
            }

            let gradeId = doc.data().grade;
            let grade = {};
            if (gradeId != null && gradeId != undefined) {
                gradeId = gradeId.id;
                const gradePromise = await getGrade(gradeId);
                let level = gradePromise.level;
                if (level == null || level == undefined) {
                    level = "";
                }
                let name = gradePromise.name;
                if (name == null || name == undefined) {
                    name = "";
                }
                grade = {
                    level: level,
                    name: name
                }
            }
            else {
                gradeId = "";
            }

            let competition = {
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
                clubId = "";
            }
            if (county != null && county != undefined) {
                county = county.id;
            }
            else {
                county = "";
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
                gradeId = "";
            }
            if (sport != null && sport != undefined) {
                sport = sport.id;
            }
            else {
                sport = "";
            }
            if (name == null || name == undefined) {
                name = "";
            }
            if (playerIds != null && playerIds != undefined) {

            }
            else {
                playerIds = "";
            }
            if (teamName == null || teamName == undefined) {
                teamName = "";
            }
            if (teamOfficialIds != null && teamOfficialIds != undefined) {

            }
            else {
                teamOfficialIds = "";
            }
            let team = {
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
            if (level == null || level == undefined) {
                level = "";
            }
            let name = doc.data().name;
            if (name == null || name == undefined) {
                name = "";
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
            if (name == null || name == undefined) {
                name = "";
            }
            let lat = doc.data().lat;
            if (lat == null || lat == undefined) {
                lat = "";
            }
            let lng = doc.data().lng;
            if (lng == null || lng == undefined) {
                lng = "";
            }
            let clubId = doc.data().club;
            let county = doc.data().county;
            if (county == null || county == undefined) {
                county = "";
            }
            if (clubId != null && clubId != undefined) {
                clubId = clubId.id;
            }
            else {
                clubId = "";
            }
            const venue = {
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
