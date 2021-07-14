<script lang="ts">
    export let params = { gameId: "" };
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import {
        allGames,
        games,
        lastName,
        teamOfficial,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import { getCompetition, getGame } from "../services/firebaseQueries";
    import GameDetails from "../components/GameDetails.svelte";
    import TeamOfficialDashboard from "./teamOfficialDashboard.svelte";
    import GameOfficialsDetails from "../components/GameOfficialsDetails.svelte";
    import Referee from "../components/Referee.svelte";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "View Game Details";
    let all_games = [];
    $: noGame = true;
    let game;

    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }

    let unsubscribeAllGames = allGames.subscribe((value) => {
        all_games = value;
    });
    onDestroy(unsubscribeAllGames);

    $: if (all_games.length > 0) {
        getThisGame(params.gameId);
    }

    let getThisGame = async (id) => {
        game = all_games.find(({ id }) => id === params.gameId);
        console.log(game.id);
        if (game == null || game == undefined) {
            game = await getGame(id);
            if (game != null && game != undefined) {
                noGame = false;
            }
        } else {
            noGame = false;
        }
    };

    $: game;
    $: referee = `${game.referee.firstName} ${game.referee.lastName}`;
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav />
            {#if noGame}
                <p>No game with this Id can be found</p>
            {:else}
                <div class="container padding-for-footer">
                    <h1>{heading}</h1>
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <GameDetails
                                date={game.date}
                                time={game.time}
                                venue={game.venue.name}
                                competition={game.competition.name}
                                teamA={game.teamA.name}
                                teamB={game.teamB.name}
                            />
                        </div>
                        <div class="col-12 col-lg-6">
                            <GameOfficialsDetails {referee} />
                        </div>
                    </div>
                </div>
            {/if}
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
