<script lang="ts">
    import Logout from "./Logout.svelte";
    import NavLi from "./NavLi.svelte";
    import {
        refereeOfClub,
        refereeOfCounty,
        secretaryOfClub,
        secretaryOfCouncil,
        secretaryOfCounty,
        secretaryOfProvince,
        teamOfficial,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";

    let secretary_of_council: boolean;
    const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value) => {
        secretary_of_council = value;
    });
    onDestroy(unsubcribeSecOfCouncil);

    let secretary_of_province: boolean;
    const unsubcribeSecOfProvince = secretaryOfProvince.subscribe((value) => {
        secretary_of_province = value;
    });
    onDestroy(unsubcribeSecOfProvince);

    let secretary_of_county: boolean;
    const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value) => {
        secretary_of_county = value;
    });
    onDestroy(unsubcribeSecOfCounty);

    let secretary_of_club: boolean;
    const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
        secretary_of_club = value;
    });
    onDestroy(unsubcribeSecOfClub);

    let team_official: boolean;
    const unsubcribeTeamOfficial = teamOfficial.subscribe((value) => {
        team_official = value;
    });
    onDestroy(unsubcribeTeamOfficial);

    let referee_of_club: boolean;
    const unsubcribeRefOfClub = refereeOfClub.subscribe((value) => {
        referee_of_club = value;
    });
    onDestroy(unsubcribeRefOfClub);

    let referee_of_county: boolean;
    const unsubcribeRefOfCounty = refereeOfCounty.subscribe((value) => {
        referee_of_county = value;
    });
    onDestroy(unsubcribeRefOfCounty);

    export let isActive: string = "";
    let refActive: string = "";
    let refAria: boolean = false;

    let officialAria: boolean = false;
    let officialActive: string = "";

    let clubAria: boolean = false;
    let clubActive: string = "";

    let countyAria: boolean = false;
    let countyActive: string = "";

    let provinceAria: boolean = false;
    let provinceActive: string = "";

    let councilAria: boolean = false;
    let councilActive: string = "";

    let homeAria: boolean = false;
    let homeActive: string = "";

    if (isActive === "home") {
        homeActive = "active";
        homeAria = true;
    } else if (isActive === "referee") {
        refAria = true;
        refActive = "active";
    } else if (isActive === "official") {
        officialActive = "active";
        officialAria = true;
    } else if (isActive === "club") {
        clubActive = "active";
        clubAria = true;
    } else if (isActive === "county") {
        countyActive = "active";
        clubAria = true;
    } else if (isActive === "province") {
        provinceActive = "active";
        provinceAria = true;
    } else if (isActive === "council") {
        councilActive = "active";
        councilAria = true;
    }
</script>

<ul class="navbar-nav navbar-nav-scroll" style="--bs-scroll-height: 200px;">
    <NavLi
        id="home"
        href="/home"
        text="Home"
        active={homeActive}
        aria={homeAria}
    />
    {#if referee_of_club || referee_of_county}
        <NavLi
            id="referee-nav"
            href="/referee"
            text="Referee"
            active={refActive}
            aria={refAria}
        />
    {/if}
    {#if team_official}
        <NavLi
            id="team-official-nav"
            href="/team-official"
            text="Official"
            active={officialActive}
            aria={officialAria}
        />
    {/if}
    {#if secretary_of_council}
        <NavLi
            id="secretary-of-council-nav"
            href="/secretary-of-council"
            text="Council"
            active={councilActive}
            aria={councilAria}
        />
    {/if}
    {#if secretary_of_province}
        <NavLi
            id="secretary-of-province-nav"
            href="/secretary-of-province"
            text="Province"
            active={provinceActive}
            aria={provinceAria}
        />
    {/if}
    {#if secretary_of_county}
        <NavLi
            id="secretary-of-county-nav"
            href="/secretary-of-county"
            text="County"
            active={countyActive}
            aria={countyAria}
        />
    {/if}
    {#if secretary_of_club}
        <NavLi
            id="secretary-of-club-nav"
            href="/secretary-of-club"
            text="Club"
            active={clubActive}
            aria={clubAria}
        />
    {/if}
    <Logout logoutBtnColors="logoutBtnColors" />
</ul>

<style>
    @media (min-width: 768px) {
        ul {
            align-content: right;
        }
    }
</style>
