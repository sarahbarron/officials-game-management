<script lang="ts">
    import { auth } from "../services/firebase";
    import router from "page";
    import Nav from "../components/NavBar.svelte";
    import { onDestroy } from "svelte";
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
    import Heading1 from "../components/Heading1.svelte";
    import RefereeOfCounty from "../components/RefereeOfCounty.svelte";
    import RefereeOfClub from "../components/RefereeOfClub.svelte";
    import TeamOfficial from "../components/TeamOfficial.svelte";
    import SecretaryOfCouncil from "../components/SecretaryOfCouncil.svelte";
    import SecretaryOfProvince from "../components/SecretaryOfProvince.svelte";
    import SecretaryOfCounty from "../components/SecretaryOfCounty.svelte";
    import SecretaryOfClub from "../components/SecretaryOfClub.svelte";
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

    // Subsribe to store values
    let first_name: string;
    const unsubscribeFirstName = firstName.subscribe((value) => {
        first_name = value;
        console.log(value);
    });
    onDestroy(unsubscribeFirstName);

    let last_name: string;
    const unsubscribeLastName = lastName.subscribe((value) => {
        last_name = value;
        console.log(value);
    });
    onDestroy(unsubscribeLastName);

    let secretary_of_council: boolean;
    const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value) => {
        secretary_of_council = value;
        console.log(value);
    });
    onDestroy(unsubcribeSecOfCouncil);

    let secretary_of_province: boolean;
    const unsubcribeSecOfProvince = secretaryOfProvince.subscribe((value) => {
        secretary_of_province = value;
        console.log(value);
    });
    onDestroy(unsubcribeSecOfProvince);

    let secretary_of_county: boolean;
    const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value) => {
        secretary_of_county = value;
        console.log(value);
    });
    onDestroy(unsubcribeSecOfCounty);

    let secretary_of_club: boolean;
    const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
        secretary_of_club = value;
        console.log(value);
    });
    onDestroy(unsubcribeSecOfClub);

    let team_official: boolean;
    const unsubcribeTeamOfficial = teamOfficial.subscribe((value) => {
        team_official = value;
        console.log(value);
    });
    onDestroy(unsubcribeTeamOfficial);

    let referee_of_club: boolean;
    const unsubcribeRefOfClub = refereeOfClub.subscribe((value) => {
        referee_of_club = value;
        console.log(value);
    });
    onDestroy(unsubcribeRefOfClub);

    let referee_of_county: boolean;
    const unsubcribeRefOfCounty = refereeOfCounty.subscribe((value) => {
        referee_of_county = value;
        console.log(value);
    });
    onDestroy(unsubcribeRefOfCounty);
</script>

{#if typeof user === "undefined"}
    <i class="fas fa-spinner w3-spin fa-3x" />
{:else if user}
    <Nav />
    <h1>{$firstName} {$lastName}'s Dashboard</h1>
    <!-- <Heading1 heading={{$first_name}} /> -->
    {#if referee_of_county}
        <RefereeOfCounty />
    {/if}
    {#if referee_of_club}
        <RefereeOfClub />
    {/if}
    {#if team_official}
        <TeamOfficial />
    {/if}
    {#if secretary_of_council}
        <SecretaryOfCouncil />
    {/if}
    {#if secretary_of_province}
        <SecretaryOfProvince />
    {/if}
    {#if secretary_of_county}
        <SecretaryOfCounty />
    {/if}
    {#if secretary_of_club}
        <SecretaryOfClub />
    {/if}
{:else}
    <h2>{@html loginString}</h2>
{/if}
