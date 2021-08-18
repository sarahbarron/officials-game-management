<script lang="ts">
    import { onDestroy } from "svelte";
    import FormCreateGame from "../components/FormCreateGame.svelte";
    import {
        getCountyCompetitions,
        getCountyReferees,
        getCountyTeams,
        getCountyVenues,
    } from "../services/firebaseQueries";
    import { clubRef } from "../services/storeUser";

    $: venueOptions = [];
    $: competitionOptions = [];
    $: teamOptions = [];
    $: refereeOptions = [];

    let club_id: string;
    let unsubscribeClubId = clubRef.subscribe((value) => {
        club_id = value;
    });
    onDestroy(unsubscribeClubId);

    let getVenues = async (club_id: string) => {
        venueOptions = await getCountyVenues(club_id);
    };

    let getCompetitions = async (club_id: string) => {
        competitionOptions = await getCountyCompetitions(club_id);
    };

    let getTeams = async (club_id: string) => {
        teamOptions = await getCountyTeams(club_id);
    };
    let getReferees = async (club_id: string) => {
        refereeOptions = await getCountyReferees(club_id);
    };

    let getFormDetails = async () => {
        if (club_id != null || club_id != undefined) {
            getVenues(club_id);
            getCompetitions(club_id);
            getTeams(club_id);
            getReferees(club_id);
        }
    };
    getFormDetails();
</script>

<FormCreateGame
    {venueOptions}
    {competitionOptions}
    {teamOptions}
    {refereeOptions}
/>
