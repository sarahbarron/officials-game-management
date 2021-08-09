<script lang="ts">
    export let teamATotalGoals: number = 0;
    export let teamATotalPoints: number = 0;
    export let teamBTotalGoals: number = 0;
    export let teamBTotalPoints: number = 0;
    export let teamA: string = "";
    export let teamB: string = "";
</script>

<div class="row">
    <div class="col-12"><h3>{teamA}</h3></div>
    <div class="col-4 title-lighter"><p>Goals:</p></div>
    <div class="col-8">
        <p>
            {#if teamATotalGoals != null || teamATotalGoals != undefined}{teamATotalGoals}{:else}unkown{/if}
        </p>
    </div>
</div>
<div class="row">
    <div class="col-4 title-lighter"><p>Points:</p></div>
    <div class="col-8">
        <p>
            {#if teamATotalPoints != null || teamATotalPoints != undefined}{teamATotalPoints}{:else}unknown{/if}
        </p>
    </div>
</div>

<div class="row">
    <div class="col-12"><h3>{teamB}</h3></div>
    <div class="col-4 title-lighter"><p>Goals:</p></div>
    <div class="col-8">
        <p>
            {#if teamBTotalGoals != null || teamBTotalGoals != undefined}{teamBTotalGoals}{:else}unkown{/if}
        </p>
    </div>
</div>
<div class="row">
    <div class="col-4 title-lighter"><p>Points:</p></div>
    <div class="col-8">
        <p>
            {#if teamBTotalPoints != null || teamBTotalPoints != undefined}{teamBTotalPoints}{:else}unknown{/if}
        </p>
    </div>
</div>
