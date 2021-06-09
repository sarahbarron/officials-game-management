<script lang="ts">
    import { auth } from "../services/firebase";
    import router from "page";
    import Logout from "../components/Logout.svelte";
    import Nav from "../components/NavBar.svelte";
    import {
        refereeOfClub,
        refereeOfCounty,
        secretaryOfClub,
        secretaryOfCouncil,
        secretaryOfCounty,
        secretaryOfProvince,
        teamOfficial,
        userEmail,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";

    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }

    // // Subscribe to user email
    // let user_email: string;
    // const unsubscribeUserEmail = userEmail.subscribe((value) => {
    //     user_email = value;
    // });
    // onDestroy(unsubscribeUserEmail);

    // let secretary_of_council: boolean;
    // const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value)=>{
    //     secretary_of_council = value;
    // });
    // onDestroy(unsubcribeSecOfCouncil);

    // let secretary_of_province: boolean;
    // const unsubcribeSecOfProvince = secretaryOfProvince.subscribe((value)=>{
    //     secretary_of_province = value;
    // });
    // onDestroy(unsubcribeSecOfProvince);

    // let secretary_of_county: boolean;
    // const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value)=>{
    //     secretary_of_county = value;
    // });
    // onDestroy(unsubcribeSecOfCounty);

    // let secretary_of_club: boolean;
    // const unsubcribeSecOfClub = secretaryOfClub.subscribe((value)=>{
    //     secretary_of_club = value;
    // });
    // onDestroy(unsubcribeSecOfClub);

    // let team_official: boolean;
    // const unsubcribeTeamOfficial = teamOfficial.subscribe((value)=>{
    //     team_official = value;
    // });
    // onDestroy(unsubcribeTeamOfficial);

    // let referee_of_club: boolean;
    // const unsubcribeRefOfClub = refereeOfClub.subscribe((value)=>{
    //     referee_of_club = value;
    // });
    // onDestroy(unsubcribeRefOfClub);

    // let referee_of_county: boolean;
    // const unsubcribeRefOfCounty = refereeOfCounty.subscribe((value)=>{
    //     referee_of_county = value;
    // });
    // onDestroy(unsubcribeRefOfCounty);
</script>

{#if typeof user === "undefined"}
    <i class="fas fa-spinner w3-spin fa-3x" />
{:else if user}
    <Nav />
    <h1>Logged In</h1>
{:else}
    <h2>Not Logged In</h2>
{/if}
