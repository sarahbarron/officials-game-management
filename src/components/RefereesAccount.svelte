<script lang="ts">
    import FinalScore from "./FinalScore.svelte";
    import LinesmenDetails from "./LinesmenDetails.svelte";
    import UmpiresDetails from "./UmpiresDetails.svelte";
    export let teamA: string = "";
    export let teamB: string = "";
    export let linesmen: ["", ""];
    export let umpires: ["", "", "", ""];
    export let teamATookToTheField: string = "";
    export let teamBTookToTheField: string = "";
    export let gameStartedAt: string = "";
    export let gameEndedAt: string = "";
    export let teamATotalGoals: number = 0;
    export let teamBTotalGoals: number = 0;
    export let teamATotalPoints: number = 0;
    export let teamBTotalPoints: number = 0;
    let heading: string = "Cúntas an Réiteora / Referees Account";
    let finalScoreHeading: string = "Final Score";
</script>

<div class="container">
    <h2>{heading}</h2>

    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>{teamA} took to the field at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if teamATookToTheField != null || teamATookToTheField != undefined}{teamATookToTheField}{:else}hello{/if}
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>{teamB} took to the field at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if teamBTookToTheField != null || teamBTookToTheField != undefined}{teamBTookToTheField}{:else}hello{/if}
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-10 col-lg-4 title-lighter">
            <p>Match started at:</p>
        </div>
        <div class="col-2 col-lg-8">
            <p>
                {#if gameStartedAt != null || gameStartedAt != undefined}{gameStartedAt}{:else}hello{/if}
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-10 col-lg-4 title-lighter"><p>Match ended at:</p></div>
        <div class="col-2 col-lg-8">
            <p>
                {#if gameEndedAt != null || gameEndedAt != undefined}{gameEndedAt}{:else}hello{/if}
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
