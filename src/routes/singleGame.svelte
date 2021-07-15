<script lang="ts">
    export let params = { gameId: "" };
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import { allGames, memberDocument } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import { getGame } from "../services/firebaseQueries";
    import GameDetails from "../components/GameDetails.svelte";
    import GameOfficialsDetails from "../components/GameOfficialsDetails.svelte";
    import MatchReportViewButton from "../components/MatchReportViewButton.svelte";
    import TeamsheetViewButton from "../components/TeamsheetViewButton.svelte";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "View Game Details";
    let all_games = [];
    $: noGame = true;
    let game;
    let memberId: string = "";
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

    let unsubscribeMemberId = memberDocument.subscribe((value) => {
        memberId = value;
    });
    onDestroy(unsubscribeMemberId);

    $: if (all_games.length > 0) {
        getThisGame(params.gameId);
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
    $: teamB = game.teamA.name;
    $: linesmen = game.linesmen;
    $: umpires = game.umpires;

    $: secretaryId = game.secretaryId;
    $: refereeId = game.referee.id;
    $: authorisedToViewMatchReport = false;
    $: if (secretaryId === memberId || refereeId === memberId) {
        authorisedToViewMatchReport = true;
        console.log(authorisedToViewMatchReport);
    }
    $: console.log(
        `member ${memberId} secretary ${secretaryId} referee ${refereeId}`
    );
    $: authorisedToSubmitTeamSheet = false;
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
                                {date}
                                {time}
                                {venue}
                                {competition}
                                {teamA}
                                {teamB}
                            />
                        </div>
                        <div class="col-12 col-lg-6">
                            <GameOfficialsDetails
                                {referee}
                                {linesmen}
                                {umpires}
                            />
                        </div>
                    </div>
                    {#if authorisedToViewMatchReport && authorisedToSubmitTeamSheet}
                        <div class="row">
                            <div class="col-12">
                                <MatchReportViewButton {gameId} />
                                <TeamsheetViewButton {gameId} />
                            </div>
                        </div>
                    {:else if authorisedToViewMatchReport}
                        <div class="row">
                            <div class="col-12">
                                <p><MatchReportViewButton {gameId} /></p>
                            </div>
                        </div>
                    {:else if authorisedToSubmitTeamSheet}
                        <div class="row">
                            <div class="col-12">
                                <TeamsheetViewButton {gameId} />
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
