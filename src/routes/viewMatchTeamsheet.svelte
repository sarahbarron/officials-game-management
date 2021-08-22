<script lang="ts">
    export let params = { gameId: "" };
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import { allGames, memberId } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import { getGame } from "../services/firebaseQueries";
    import GameDetails from "../components/GameDetails.svelte";
    import GameOfficialsDetails from "../components/GameOfficialsDetails.svelte";
    import ViewTeamSheet from "../components/ViewTeamSheet.svelte";

    let heading = "Match Teamsheet";
    let member: string = "";
    let all_games = [];
    $: noGame = true;
    let game;
    let gameId = params.gameId;
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

    let unsubscribeMemberId = memberId.subscribe((value) => {
        member = value;
    });
    onDestroy(unsubscribeMemberId);

    $: if (all_games.length > 0) {
        getThisGame(gameId);
    }

    /**
     Find the game in the locally stored games, if its not there 
     retrieve it from firestore.
     */
    let getThisGame = async (id) => {
        game = all_games.find(({ id }) => id === params.gameId);
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
    $: date = game.date;
    $: time = game.time;
    $: venue = game.venue.name;
    $: competition = game.competition.name;
    $: teamA = game.teamA.name;
    $: teamB = game.teamB.name;
    $: linesmen = game.linesmen;
    $: umpires = game.umpires;
    $: teamAId = game.teamA.id;
    $: teamBId = game.teamB.id;
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav />

            <div class="container padding-for-footer">
                <h1>{heading}</h1>

                <div class="row">
                    <div class="col-12 col-lg-6">
                        <GameDetails
                            {date}
                            {time}
                            {venue}
                            {competition}
                            {teamA}
                            {teamB}
                        />
                    </div>
                    <div class="col-12 col-lg-6">
                        <GameOfficialsDetails {referee} {linesmen} {umpires} />
                    </div>
                </div>
                <br />
                <div class="row">
                    <ViewTeamSheet
                        {gameId}
                        {teamAId}
                        {teamBId}
                        {teamA}
                        {teamB}
                    />
                </div>
            </div>
        {:else}
            <div class="row">
                <div class="col-12">
                    <p id="unauthorised">
                        You are not an authorised to view this team sheet!
                    </p>
                </div>
            </div>
        {/if}

        <Footer />
    </div>
</div>

<style>
    #unauthorised {
        text-align: center;
    }
</style>
