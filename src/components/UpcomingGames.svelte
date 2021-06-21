<script lang="ts">
    export let games = [];

    import UpcomingGameListItem from "./UpcomingGameListItem.svelte";
    // if (userType === "referee") {
    //     const unsubscribeRefereeUpcomingGames = refUpcomingGames.subscribe(
    //         (value) => {
    //             games = value;
    //         }
    //     );
    //     onDestroy(unsubscribeRefereeUpcomingGames);
    // }
    // if (userType === "teamOfficial") {
    //     const unsubscribeTeamOfficialUpcomingGames =
    //         teamOfficialUpcomingGames.subscribe((value) => {
    //             games = value;
    //         });
    //     onDestroy(unsubscribeTeamOfficialUpcomingGames);
    // }

    // if (userType === "secOfClub") {
    //     const unsubscribeSecOfClubUpcomingGames =
    //         secClubUpcomingGames.subscribe((value) => {
    //             games = value;
    //         });
    //     onDestroy(unsubscribeSecOfClubUpcomingGames);
    // }

    // if (userType === "secOfCounty") {
    //     const unsubscribeSecOfCountyUpcomingGames =
    //         secCountyUpcomingGames.subscribe((value) => {
    //             games = value;
    //             console.log(`sec of county games ${games}`);
    //         });
    //     onDestroy(unsubscribeSecOfCountyUpcomingGames);
    // }

    // if (userType === "secOfProvince") {
    //     const unsubscribeSecOfProvinceUpcomingGames =
    //         secProvinceUpcomingGames.subscribe((value) => {
    //             games = value;
    //         });
    //     onDestroy(unsubscribeSecOfProvinceUpcomingGames);
    // }
    // if (userType === "secOfCouncil") {
    //     const unsubscribeSecOfCouncilUpcomingGames =
    //         secCouncilUpcomingGames.subscribe((value) => {
    //             games = value;
    //         });
    //     onDestroy(unsubscribeSecOfCouncilUpcomingGames);
    // }

    $: games;
</script>

{#if games.length === 0}
    <p>Retrieving upcoming games one moment ...</p>
{:else}
    <UpcomingGameListItem {games} />
{/if}
