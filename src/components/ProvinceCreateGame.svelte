<script lang="ts">
    import { onDestroy } from "svelte";
    import FormCreateGame from "../components/FormCreateGame.svelte";
    import {
        getCountyRefsOfProvince,
        getProvinceId,
        getProvincialClubReferences,
        getProvincialCompetitions,
        getProvincialReferees,
        getProvincialTeams,
        getProvincialVenues,
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

    let getVenues = async (countyRefs) => {
        venueOptions = await getProvincialVenues(countyRefs);
    };

    let getCompetitions = async (provinceId: string) => {
        competitionOptions = await getProvincialCompetitions(provinceId);
    };

    let getTeams = async (countyRefs: any[]) => {
        teamOptions = await getProvincialTeams(countyRefs);
    };
    let getReferees = async (clubReferences: any[]) => {
        refereeOptions = await getProvincialReferees(clubReferences);
    };

    let getFormDetails = async () => {
        let countyReferences = [];
        let clubReferences = [];
        let provinceId = await getProvinceId(club_id);
        console.log(provinceId);

        if (provinceId != null && provinceId != undefined) {
            countyReferences = await getCountyRefsOfProvince(provinceId);
            if (
                countyReferences != null &&
                countyReferences != undefined &&
                countyReferences.length > 0
            ) {
                getVenues(countyReferences);
                getTeams(countyReferences);
                clubReferences = await getProvincialClubReferences(
                    countyReferences
                );
            }
            if (
                clubReferences != null &&
                clubReferences != undefined &&
                clubReferences.length > 0
            ) {
                getReferees(clubReferences);
            }
            getCompetitions(provinceId);
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
<br />
