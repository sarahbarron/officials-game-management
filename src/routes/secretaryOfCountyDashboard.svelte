<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Heading1 from "../components/Heading1.svelte";
    import Footer from "../components/Footer.svelte";
    import Card from "../components/Card.svelte";
    import { onDestroy } from "svelte";
    import {
        secretaryOfCounty,
        secCountyUpcomingClubGames,
        secCountyUpcomingCountyGames,
        secCountyPastClubGames,
        secCountyPastCountyGames,
    } from "../services/storeUser";

    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Secretary Of County Dashboard";
    let isActive = "county";
    let upcomingClubGames = [];
    let upcomingCountyGames = [];
    let pastClubGames = [];
    let pastCountyGames = [];
    let upcomingClubCardHeader = "Upcoming Club Games";
    let upcomingCountyCardHeader = "Upcoming County Games";
    let pastClubCardHeader = "Past Club Games";
    let pastCountyCardHeader = "Past County Games";
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
    const unsubscribeSecretary = secretaryOfCounty.subscribe((value) => {
        isSecretary = value;
    });
    onDestroy(unsubscribeSecretary);

    if (isSecretary) {
        const unsubscribeUpcomingClubGames =
            secCountyUpcomingClubGames.subscribe((value) => {
                upcomingClubGames = value;
            });
        onDestroy(unsubscribeUpcomingClubGames);

        const unsubscibePastClubGames = secCountyPastClubGames.subscribe(
            (value) => {
                pastClubGames = value;
            }
        );
        onDestroy(unsubscibePastClubGames);

        const unsubscribeUpcomingCountyGames =
            secCountyUpcomingCountyGames.subscribe((value) => {
                upcomingCountyGames = value;
            });
        onDestroy(unsubscribeUpcomingCountyGames);

        const unsubscibePastCountyGames = secCountyPastCountyGames.subscribe(
            (value) => {
                pastCountyGames = value;
            }
        );
        onDestroy(unsubscibePastCountyGames);
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav {isActive} />
            <div class="container padding-for-footer">
                <Heading1 {heading} />
                <Card
                    cardHeader={upcomingCountyCardHeader}
                    games={upcomingCountyGames}
                />
                <br /><br />
                <Card
                    cardHeader={upcomingClubCardHeader}
                    games={upcomingClubGames}
                />
                <br /><br />
                <Card
                    cardHeader={pastCountyCardHeader}
                    games={pastCountyGames}
                />
                <Card cardHeader={pastClubCardHeader} games={pastClubGames} />
            </div>
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
