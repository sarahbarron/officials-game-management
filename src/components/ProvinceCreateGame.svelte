<script lang="ts">
    import { onDestroy } from "svelte";
    import FormCreateGame from "../components/FormCreateGame.svelte";
    import {
        getCountyRefsOfProvince,
        getProvinceId,
        getProvincialCompetitions,
        getProvincialTeams,
        getProvincialVenues,
    } from "../services/firebaseQueries";

    import { clubRef, provinceName } from "../services/storeUser";

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

    let getTeams = async (countyRefs) => {
        teamOptions = await getProvincialTeams(countyRefs);
    };
    let getReferees = async (countyRefs: []) => {
        // refereeOptions = await getProvinceReferees(clubId);
    };

    let getFormDetails = async () => {
        let countyRefs = [];
        let provinceId = await getProvinceId(club_id);

        if (provinceId != null && provinceId != undefined) {
            countyRefs = await getCountyRefsOfProvince(provinceId);
            if (countyRefs != null && countyRefs != undefined) {
                getVenues(countyRefs);
                getTeams(countyRefs);
            }
            getCompetitions(provinceId);
        }

        // let countyIds = getCountyIdsOfProvince(provinceId);
        // if (provinceId != null && provinceId != undefined) {
        //     getVenues(provinceId);
        //     getCompetitions(provinceId);
        //     getTeams(provinceId);
        //     getReferees(provinceId);
        // }
    };

    getFormDetails();
</script>

<FormCreateGame />
<!-- 
<FormCreateGame
    {venueOptions}
    {competitionOptions}
    {teamOptions}
    {refereeOptions}
/> -->
<br />
