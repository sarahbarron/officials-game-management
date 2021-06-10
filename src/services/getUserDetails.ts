
import {
    userEmail, memberDocument,
    refereeOfClub,
    refereeOfCounty, secretaryOfClub, secretaryOfCounty, secretaryOfProvince,
    secretaryOfCouncil, teamOfficial, firstName, lastName, clubRef, clubCrest, clubName,
    countyCrest, countyName, provinceName,
    refUpcomingGames
} from './storeUser';
import { db } from "../services/firebase";

const member = db.collection('Member');


let clubId: string;
let countyId: string;

export let getMember = async (email: string) => {
    console.log("getMember: " + email);
    await getMemberDetails(email);
    console.log("Own Club: " + clubId);
    if (clubId != null && clubId != undefined) {
        await getClubDetails(clubId);
    }
    if (countyId != null && countyId != undefined) {
        await getCountyDetails(countyId);
    }
}

let getMemberDetails = async (email: string) => {
    console.log(`getMemberDetails: ${email}`);
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
        if (refOfCounty != undefined && refOfCounty) {
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
        console.log(`
        member doc path: ${memberDoc}
        referee of club: ${refOfClub}
        referee of county: ${refOfCounty},
        secretary of club: ${secOfClub}, 
        secretary of county ${secOfCounty},
        secretary of province: ${secOfProvince},
        secretary of council: ${secOfCouncil},
        team official: ${teamOf},
        Name: ${fName} ${lName},
        Club Ref: ${clubId},
        `);
    });
    return true;
}

let getClubDetails = async (clubId: string) => {
    const club = db.collection("Club").doc(clubId);
    const doc = await club.get();
    if (doc.exists) {
        countyId = doc.data().county.id;
        let crest = doc.data().crest;
        let name = doc.data().name;
        countyName.set(countyId);
        clubCrest.set(crest);
        clubName.set(name);
        console.log(`County Id: ${countyId}, Crest: ${crest}, Name: ${name}`);
    }
    return true;
}


let getCountyDetails = async (countyId: string) => {
    const county = db.collection("County").doc(countyId);
    const doc = await county.get();
    if (doc.exists) {
        let crest = doc.data().crest;
        let province = doc.data().province.id;
        countyCrest.set(crest);
        provinceName.set(province);

        console.log(`Province: ${province}, Crest: ${crest}`);

    }
    return true;
}


export let getRefereeUpcomingGames = async (memberId: string) => {
    let game = {};
    let games = [];
    const memberDoc = db.doc(`/Member/${memberId}`);
    const gamesCollection = db.collection("Game");
    const querySnapshot = await gamesCollection
        .where("referee", "==", memberDoc)
        .where("dateTime", ">=", new Date())
        .orderBy("dateTime")
        .get()
    querySnapshot.forEach((doc) => {
        let competitionId = doc.data().competition;
        let dateTime = doc.data().dateTime;
        let linesmen = doc.data().linesmen;
        let umpires = doc.data().umpires;
        let refereeId = doc.data().referee;
        let substituteRefereeId = doc.data().substituteReferee;
        let teamAId = doc.data().teamA;
        let teamBId = doc.data().teamB;
        let venueId = doc.data().venue;

        if (competitionId == null || competitionId == undefined) {
            competitionId = "";
        }
        else {
            competitionId = competitionId.id
        }
        if (dateTime == null || dateTime == undefined) {
            dateTime = "";
        }
        if (linesmen == null || linesmen == undefined) {
            linesmen = "";
        }
        if (umpires == null || umpires == undefined) {
            umpires = "";
        }
        if (refereeId == null || refereeId == undefined) {
            refereeId = "";
        }
        else {
            refereeId = refereeId.id;
        }
        if (substituteRefereeId == null || substituteRefereeId == undefined) {
            substituteRefereeId = "";
        }
        else {
            substituteRefereeId = substituteRefereeId.id;
        }
        if (teamAId == null || teamAId == undefined) {
            teamAId = "";
        }
        else {
            teamAId = teamAId.id;
        }
        if (teamBId == null || teamBId == undefined) {
            teamBId = "";
        }
        else {
            teamBId = teamBId.id;
        }
        if (venueId == null || venueId == undefined) {
            venueId = "";
        }
        else {
            venueId = venueId.id;
        }
        game = {
            competitionId: competitionId,
            dateTime: dateTime,
            linesmen: linesmen,
            refereeId: refereeId,
            substituteRefereeId: substituteRefereeId,
            teamAId: teamAId,
            teamBId: teamBId,
            umpires: umpires,
            venueId: venueId
        }
        games = [...games, game];
    });
    refUpcomingGames.set(games);
}

export let getCompetition = async (compId: string) => {
    const comp = db.collection("Competition").doc(compId);
    const doc = await comp.get();
    if (doc.exists) {
        let county = doc.data().county;
        let province = doc.data().province;
        let isNational = doc.data().isNational;
        let name = doc.data().name;
        let sport = doc.data().sportType.id;

    }
    return true;
}