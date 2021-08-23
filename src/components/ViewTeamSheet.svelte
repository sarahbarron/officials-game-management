<script lang="ts">
    import ViewTeamSheetForTeam from "./ViewTeamSheetForTeam.svelte";
    import { getTeamSheet } from "../services/firebaseQueries";

    export let teamAId = "";
    export let teamBId = "";
    export let teamA = "";
    export let teamB = "";
    export let gameId = "";

    $: teamATeamsheet = [];
    $: teamBTeamsheet = [];

    $: loadingAPlayers = true;
    $: loadingBPlayers = true;
    $: teamANoTeamSheet = false;
    $: teamBNoTeamsheet = false;

    let getGameTeamsheets = async () => {
        let teamsheetA = await getTeamSheet(gameId, teamAId);
        let teamsheetB = await getTeamSheet(gameId, teamBId);
        if (
            teamsheetA != null &&
            teamsheetA != undefined &&
            teamsheetA.length > 0
        ) {
            loadingAPlayers = false;
            teamATeamsheet = teamsheetA;
        } else {
            console.log(teamsheetA.length);

            loadingAPlayers = false;
            teamANoTeamSheet = true;
        }
        if (
            teamsheetB != null &&
            teamsheetB != undefined &&
            teamsheetB.length > 0
        ) {
            loadingBPlayers = false;
            teamBTeamsheet = teamsheetB;
        } else {
            loadingBPlayers = false;
            teamBNoTeamsheet = true;
        }
    };
    getGameTeamsheets();
</script>

<div class="container">
    <div class="row">
        <h2>Team Sheets</h2>
        <div class="row">
            <div class="col-12 col-md-6 teamsheet">
                <ViewTeamSheetForTeam
                    teamName={teamA}
                    teamsheet={teamATeamsheet}
                    loading={loadingAPlayers}
                    noTeam={teamANoTeamSheet}
                />
            </div>
            <div class="col-12 col-md-6 teamsheet">
                <ViewTeamSheetForTeam
                    teamName={teamB}
                    teamsheet={teamBTeamsheet}
                    loading={loadingBPlayers}
                    noTeam={teamBNoTeamsheet}
                />
            </div>
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
        margin-bottom: 50px;
    }

    .teamsheet {
        height: 100%;
    }
</style>
