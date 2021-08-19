<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import { onDestroy } from "svelte";
    import {
        secretaryOfClub,
        secClubUpcomingGames,
        secClubPastGames,
    } from "../services/storeUser";
    import Card from "../components/Card.svelte";
    import Spinner from "../components/Spinner.svelte";

    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Secretary Of Club Dashboard";
    let isActive = "club";
    let upcomingGames = [];
    let pastGames = [];
    let upcomingCardHeader = "Upcoming Games";
    let pastCardHeader = "Past Games";

    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }
    let secretary_of_club: boolean;
    const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
        secretary_of_club = value;
    });
    onDestroy(unsubcribeSecOfClub);

    // if the user is not a secretary of a club revert back to login
    $: if (!secretary_of_club) {
        router.redirect("/login");
    }

    let isSecretary: boolean = false;
    const unsubscribeSecretary = secretaryOfClub.subscribe((value) => {
        isSecretary = value;
    });
    onDestroy(unsubscribeSecretary);

    if (isSecretary) {
        const unsubscribeUpcomingGames = secClubUpcomingGames.subscribe(
            (value) => {
                upcomingGames = value;
            }
        );
        onDestroy(unsubscribeUpcomingGames);

        const unsubscibePastGames = secClubPastGames.subscribe((value) => {
            pastGames = value;
        });
        onDestroy(unsubscibePastGames);
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user && secretary_of_club}
            <Nav {isActive} />
            <div class="container padding-for-footer">
                <h1>{heading}</h1>
                <Spinner />
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
