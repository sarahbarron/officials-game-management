<script lang="ts">
    import { auth } from "../services/firebase";
    import router from "page";
    import Nav from "../components/NavBar.svelte";
    import { onDestroy } from "svelte";
    import Footer from "../components/Footer.svelte";
    import {
        firstName,
        lastName,
        refereeOfClub,
        refereeOfCounty,
        secretaryOfClub,
        secretaryOfCouncil,
        secretaryOfCounty,
        secretaryOfProvince,
        teamOfficial,
    } from "../services/storeUser";
    import DashboardAccordion from "../components/DashboardAccordion.svelte";
    let loginString = `You need to <a href='/login'>Login</a>`;
    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }

    let first_name: string;
    const unsubscribeFirstName = firstName.subscribe((value) => {
        first_name = value;
    });
    onDestroy(unsubscribeFirstName);

    let last_name: string;
    const unsubscribeLastName = lastName.subscribe((value) => {
        last_name = value;
    });
    onDestroy(unsubscribeLastName);

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

    let heading = "";
    $: if (last_name.length > 0) {
        heading = `${first_name} ${last_name}'s Dashboard`;
    }

    let referee: boolean = false;
    $: if (referee_of_club || referee_of_county) {
        referee = true;
    }
    let isActive = "home";
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav {isActive} />
            <div class="padding-for-footer">
                <h1>{heading}</h1>
                <DashboardAccordion
                    {referee}
                    {team_official}
                    {secretary_of_council}
                    {secretary_of_province}
                    {secretary_of_county}
                    {secretary_of_club}
                />
            </div>
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
