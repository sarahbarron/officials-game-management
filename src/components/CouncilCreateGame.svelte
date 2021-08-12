<script lang="ts">
    import {
        getNationalCompetitions,
        getNationalReferees,
        getNationalTeams,
        getNationalVenues,
    } from "../services/firebaseQueries";

    import FormCreateGame from "./FormCreateGame.svelte";
    $: venueOptions = [];
    $: competitionOptions = [];
    $: teamOptions = [];
    $: refereeOptions = [];
    let getVenues = async () => {
        venueOptions = await getNationalVenues();
    };
    getVenues();

    let getCompetitions = async () => {
        competitionOptions = await getNationalCompetitions();
    };
    getCompetitions();

    let getTeams = async () => {
        teamOptions = await getNationalTeams();
    };
    getTeams();

    let getReferees = async () => {
        refereeOptions = await getNationalReferees();
    };
    getReferees();
</script>

<FormCreateGame
    {venueOptions}
    {competitionOptions}
    {teamOptions}
    {refereeOptions}
/>
<br />
