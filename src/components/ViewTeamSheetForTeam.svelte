<script lang="ts">
    import { addPlayerToTeamSheetInFirestore } from "../services/firebaseQueries";

    export let teamsheet = [];
    export let loading = true;
    export let noTeam = false;
    export let teamName = "";
    let loadingMsg = "Loading teamsheet ...";
    let noTeamMsg = "No Teamsheet submitted yet!";
</script>

<div class="container">
    <h4>{teamName}</h4>
    {#if loading}
        <p>{loadingMsg}</p>
    {:else if noTeam}
        <p>{noTeamMsg}</p>
    {:else}
        <h4>Stating Team</h4>
        {#each teamsheet as player}
            {#if player.fieldPosition != null}
                <div class="row">
                    <div class="col-2">
                        <p>{player.fieldPosition}</p>
                    </div>
                    <div class="col-10">
                        <p>({player.jerseyNumber}) {player.name}</p>
                    </div>
                </div>
            {/if}
        {/each}

        <hr />
        <h4>Substitutes</h4>
        {#each teamsheet as player}
            {#if player.fieldPosition == null}
                <div class="row">
                    <div class="col-2">
                        <p>sub</p>
                    </div>
                    <div class="col-10">
                        <p>({player.jerseyNumber}) {player.name}</p>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
        padding-bottom: 50px;
        height: 100%;
        margin-bottom: 50px;
    }
</style>
