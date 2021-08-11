<script lang="ts">
    import { convertTimestampToDate } from "../services/util";

    import FinalScore from "./FinalScore.svelte";
    import LinesmenDetails from "./LinesmenDetails.svelte";
    import UmpiresDetails from "./UmpiresDetails.svelte";
    export let teamA: string = "";
    export let teamB: string = "";
    export let linesmen: ["", ""];
    export let umpires: ["", "", "", ""];
    export let additionalGameDetails: {};

    let teamATookToField: string = "";
    let teamBTookToField: string = "";
    let matchStarted: string = "";
    let matchEnded: string = "";
    let teamATotalGoals: number = 0;
    let teamBTotalGoals: number = 0;
    let teamATotalPoints: number = 0;
    let teamBTotalPoints: number = 0;
    let heading: string = "Cúntas an Réiteora / Referees Account";
    let finalScoreHeading: string = "Final Score";

    $: if (additionalGameDetails != {}) {
        getGameDetails(additionalGameDetails);
    }

    let getGameDetails = async (game) => {
        teamATookToField = game.teamATookToField;
        teamBTookToField = game.teamBTookToField;
        matchStarted = game.matchStarted;
        matchEnded = game.matchEnded;
        teamATotalPoints = game.teamATotalPoints;
        teamBTotalPoints = game.teamBTotalPoints;
        teamATotalGoals = game.teamATotalGoals;
        teamBTotalGoals = game.teamBTotalGoals;
    };
</script>

<div class="container">
    <h2>{heading}</h2>

    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>{teamA} took to the field at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if teamATookToField != null || teamATookToField != undefined}{teamATookToField}{/if}
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>{teamB} took to the field at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if teamBTookToField != null || teamBTookToField != undefined}{teamBTookToField}{/if}
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>Match started at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if matchStarted != null || matchStarted != undefined}{matchStarted}{/if}
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-10 col-lg-4 title-lighter"><p>Match ended at:</p></div>
        <div class="col-2 col-lg-8">
            <p>
                {#if matchEnded != null || matchEnded != undefined}{matchEnded}{/if}
            </p>
        </div>
    </div>

    <LinesmenDetails {linesmen} />
    <UmpiresDetails {umpires} />
    <h2>{finalScoreHeading}</h2>
    <hr />
    <FinalScore
        {teamA}
        {teamB}
        {teamATotalGoals}
        {teamBTotalGoals}
        {teamATotalPoints}
        {teamBTotalPoints}
    />
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
        padding-bottom: 50px;
        height: 100%;
    }
</style>
