<script lang="ts">
    import { getListOfTeamPlayers } from "../services/firebaseQueries";
    import TeamSheetTable from "./TeamSheetTable.svelte";
    export let teamId: string = "";
    export let gameId: string = "";

    $: players = [];

    let getListOfPlayers = async (teamId: string) => {
        let listOfPlayers = await getListOfTeamPlayers(teamId);
        if (listOfPlayers != null || listOfPlayers != undefined) {
            players = listOfPlayers;
        }
    };
    if (teamId != null && teamId != undefined && teamId != "") {
        getListOfPlayers(teamId);
    }
</script>

<div class="row">
    <div class="col-12">
        <TeamSheetTable {players} {teamId} {gameId} />
    </div>
</div>
