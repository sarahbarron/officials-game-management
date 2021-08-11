<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import Card from "../components/Card.svelte";
    import {
        secCouncilPastGames,
        secCouncilUpcomingGames,
        secretaryOfCouncil,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import CouncilCreateGame from "../components/CouncilCreateGame.svelte";
    let upcomingGames = [];
    let pastGames = [];

    let upcomingCardHeader = "Upcoming Games";
    let pastCardHeader = "Past Games";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Secretary Of Council Dashboard";
    let isActive = "council";
    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }

    let isSecretary: boolean = false;
    const unsubscribeSecretary = secretaryOfCouncil.subscribe((value) => {
        isSecretary = value;
    });
    onDestroy(unsubscribeSecretary);

    if (isSecretary) {
        const unsubscribeUpcomingGames = secCouncilUpcomingGames.subscribe(
            (value) => {
                upcomingGames = value;
            }
        );
        onDestroy(unsubscribeUpcomingGames);

        const unsubscibePastGames = secCouncilPastGames.subscribe((value) => {
            pastGames = value;
        });
        onDestroy(unsubscibePastGames);
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user && isSecretary}
            <Nav {isActive} />
            <div class="container padding-for-footer">
                <h1>{heading}</h1>
                <CouncilCreateGame />
                <Card cardHeader={upcomingCardHeader} games={upcomingGames} />
                <br /><br />
                <Card cardHeader={pastCardHeader} games={pastGames} />
            </div>
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
