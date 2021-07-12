<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Heading1 from "../components/Heading1.svelte";
    import Footer from "../components/Footer.svelte";
    import Card from "../components/Card.svelte";
    import {
        refUpcomingGames,
        refPastGames,
        refereeOfClub,
        refereeOfCounty,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let upcomingGames = [];
    let pastGames = [];

    let upcomingCardHeader = "Upcoming Games";
    let pastCardHeader = "Past Games";

    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Referee Dashboard";
    let isActive = "referee";
    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }

    let isClubRef: boolean = false;
    const unsubscribeClubRef = refereeOfClub.subscribe((value) => {
        isClubRef = value;
    });
    onDestroy(unsubscribeClubRef);

    let isCountyRef: boolean = false;
    const unsubscribeCountyRef = refereeOfCounty.subscribe((value) => {
        isCountyRef = value;
    });
    onDestroy(unsubscribeCountyRef);
    if (isCountyRef || isClubRef) {
        const unsubscribeUpcomingGames = refUpcomingGames.subscribe((value) => {
            upcomingGames = value;
        });
        onDestroy(unsubscribeUpcomingGames);

        const unsubscribePastGames = refPastGames.subscribe(
            (value) => (pastGames = value)
        );
        onDestroy(unsubscribePastGames);
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            {#if isClubRef || isCountyRef}
                <Nav {isActive} />
                <div class="container padding-for-footer">
                    <Heading1 {heading} />
                    <Card
                        cardHeader={upcomingCardHeader}
                        games={upcomingGames}
                    />
                    <Card cardHeader={pastCardHeader} games={pastGames} />
                </div>
                <Footer />
            {/if}
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
