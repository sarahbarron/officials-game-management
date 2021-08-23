<script lang="ts">
    import { getListOfTeamPlayers } from "../services/firebaseQueries";
    import TeamSheetTable from "./TeamSheetTable.svelte";
    export let teamId: string = "";
    export let gameId: string = "";

    $: players = [];
    $: loading = true;
    $: message = "Loading team...";
    let getListOfPlayers = async (teamId: string) => {
        let listOfPlayers = await getListOfTeamPlayers(teamId);
        if (listOfPlayers != null || listOfPlayers != undefined) {
            loading = false;
            players = listOfPlayers;
        } else {
            message = "No players to view";
        }
    };
    if (teamId != null && teamId != undefined && teamId != "") {
        getListOfPlayers(teamId);
    }
</script>

<div class="row">
    <div class="col-12">
        <div class="container">
            {#if loading}
                <h3>{message}</h3>
            {:else}
                <TeamSheetTable {players} {teamId} {gameId} />
            {/if}
        </div>
    </div>
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
