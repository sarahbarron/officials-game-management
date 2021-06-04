
import {
    userEmail,
    refereeOfClub,
    refereeOfCounty, secretaryOfClub, secretaryOfCounty, secretaryOfProvince,
    secretaryOfCouncil, teamOfficial, firstName, lastName, clubRef, clubCrest, clubName,
    countyCrest, countyName, provinceName
} from './storeUser';
import { auth, db, rtdb } from "../services/firebase";

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
        userEmail.set(email);
        refereeOfClub.set(refOfClub);
        refereeOfCounty.set(refOfCounty);
        secretaryOfClub.set(secOfClub);
        secretaryOfCounty.set(secOfCounty);
        secretaryOfProvince.set(secOfProvince);
        secretaryOfCouncil.set(secOfCouncil);
        teamOfficial.set(teamOf);
        firstName.set(fName);
        lastName.set(lName);
        clubRef.set(clubId);
        console.log(`referee of club: ${refOfClub}
        referee of county: ${refOfCounty} \n
        secretary of club: ${secOfClub}, \n
        secretary of county ${secOfCounty} \n
        secretary of province: ${secOfProvince}\n
        secretary of council: ${secOfCouncil}\n
        team official: ${teamOf}\n
        Name: ${fName} ${lName}\n
        Club Ref: ${clubId}\n
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