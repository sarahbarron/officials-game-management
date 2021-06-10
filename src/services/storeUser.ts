import { writable } from 'svelte/store';
import { localStore } from './localStore';
export const userEmail = localStore('userEmail', "");
export const refereeOfClub = localStore('refereeOfClub', false);
export const refereeOfCounty = localStore('refereeOfCounty', false);
export const secretaryOfClub = localStore('secretaryOfClub', false);
export const secretaryOfCounty = localStore('secretaryOfCounty', false);
export const secretaryOfProvince = localStore('secretaryOfProvince', false);
export const secretaryOfCouncil = localStore('secretaryOfCouncil', false);
export const teamOfficial = localStore('teamOfficial', false);
export const firstName = localStore('firstName', "");
export const lastName = localStore('lastName', "");
export const clubRef = localStore('clubRef', "");
export const teams = localStore('teams', []);
export const games = localStore('games', []);
export const clubCrest = localStore('clubCrest', "");
export const countyCrest = localStore('countyCrest', "");
export const clubName = localStore('clubName', "");
export const countyName = localStore('countyName', "");
export const provinceName = localStore('provinceName', "");


export const resetStore = () => {
    userEmail.set("");
    refereeOfClub.set(false);
    refereeOfCounty.set(false);
    secretaryOfClub.set(false);
    secretaryOfCounty.set(false);
    secretaryOfProvince.set(false);
    secretaryOfCouncil.set(false);
    teamOfficial.set(false);
    firstName.set("");
    lastName.set("");
    clubRef.set("");
    teams.set([]);
    games.set([]);
    clubCrest.set("");
    countyCrest.set("");
    clubName.set("");
    countyName.set("");
    provinceName.set("");
    console.log("Store Reset");
};

