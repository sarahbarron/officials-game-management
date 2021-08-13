<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import { onDestroy } from "svelte";
    import Card from "../components/Card.svelte";
    import {
        secretaryOfProvince,
        secProvinceUpcomingGames,
        secProvincePastGames,
    } from "../services/storeUser";
    import ProvinceCreateGame from "../components/ProvinceCreateGame.svelte";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Secretary Of Province Dashboard";
    let isActive = "province";
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

    let isSecretary: boolean = false;
    const unsubscribeSecretary = secretaryOfProvince.subscribe((value) => {
        isSecretary = value;
    });
    onDestroy(unsubscribeSecretary);

    if (isSecretary) {
        const unsubscribeUpcomingGames = secProvinceUpcomingGames.subscribe(
            (value) => {
                upcomingGames = value;
            }
        );
        onDestroy(unsubscribeUpcomingGames);

        const unsubscibePastGames = secProvincePastGames.subscribe((value) => {
            pastGames = value;
        });
        onDestroy(unsubscibePastGames);
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav {isActive} />
            <div class="container padding-for-footer">
                <h1>{heading}</h1>
                <ProvinceCreateGame />
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
