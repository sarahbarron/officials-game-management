<script lang="ts">
    export let params = { gameId: "" };
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import { allGames, memberDocument } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import { getGame } from "../services/firebaseQueries";
    import MRGameDetails from "../components/MRGameDetails.svelte";
    import RefereeDetails from "../components/RefereeDetails.svelte";
    import RefereesAccount from "../components/RefereesAccount.svelte";
    import Substitutes from "../components/Substitutes.svelte";
    import MatchReportCardsOrderedFromField from "../components/MatchReportCardsOrderedFromField.svelte";
    import MatchReportCautionedCards from "../components/MatchReportCautionedCards.svelte";

    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Match Report";
    let memberId: string = "";
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
    $: secretaryId = game.secretaryId;
    $: refereeId = game.referee.id;
    $: referee = `${game.referee.firstName} ${game.referee.lastName}`;
    $: refereeAddressLine1 = game.referee.addressLine1;
    $: refereeAddressLine2 = game.referee.addressLine2;
    $: refereeTown = game.referee.town;
    $: refereeCounty = game.referee.county;
    $: refereeEircode = game.referee.eircode;
    $: date = game.date;
    $: time = game.time;
    $: venue = game.venue.name;
    $: competition = game.competition.name;
    $: teamA = game.teamA.name;
    $: teamB = game.teamB.name;
    $: linesmen = game.linesmen;
    $: umpires = game.umpires;
    $: teamATookToTheField = game.teamATookToTheField;
    $: teamBTookToTheField = game.teamBTookToTheField;
    $: gameStartedAt = game.gameStartedAt;
    $: gameEndedAt = game.gameEndedAt;
    $: teamATotalGoals = game.teamATotalGoals;
    $: teamBTotalGoals = game.teamBTotalGoals;
    $: teamATotalPoints = game.teamATotalPoints;
    $: teamBTotalPoints = game.teamBTotalPoints;
    // The authorised member must be the secretary who creted the game or the
    // the referee of the game to view the match report.
    $: authorised = false;
    $: if (secretaryId === memberId || refereeId === memberId) {
        authorised = true;
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            {#if authorised}
                <Nav />
                {#if noGame}
                    <p>No game with this Id can be found</p>
                {:else}
                    <div class="container padding-for-footer">
                        <h1>{heading}</h1>
                        <div class="row">
                            <div class="col-12">
                                <RefereeDetails
                                    {referee}
                                    {refereeAddressLine1}
                                    {refereeAddressLine2}
                                    {refereeTown}
                                    {refereeCounty}
                                    {refereeEircode}
                                />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12">
                                <MRGameDetails
                                    {date}
                                    {time}
                                    {venue}
                                    {competition}
                                    {teamA}
                                    {teamB}
                                />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12">
                                <RefereesAccount
                                    {teamA}
                                    {teamB}
                                    {linesmen}
                                    {umpires}
                                    {teamATookToTheField}
                                    {teamBTookToTheField}
                                    {gameStartedAt}
                                    {gameEndedAt}
                                    {teamATotalGoals}
                                    {teamATotalPoints}
                                    {teamBTotalGoals}
                                    {teamBTotalPoints}
                                />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12">
                                <Substitutes />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-12">
                                <MatchReportCardsOrderedFromField />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-">
                                <MatchReportCautionedCards />
                            </div>
                        </div>
                    </div>
                {/if}
                <Footer />
            {:else}
                <p>
                    Unauthorised you are not the secretary or referee of this
                    match report
                </p>
                <p>${loginString}</p>
            {/if}
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
