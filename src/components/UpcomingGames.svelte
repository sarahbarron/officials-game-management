<script lang="ts">
    export let userType: string = "";
    let games = [];
    let countyGames = [];
    let clubGames = [];
    import { onDestroy } from "svelte";
    import { dataset_dev } from "svelte/internal";
    import { getCompetition } from "../services/firebaseQueries";
    import { refUpcomingGames } from "../services/storeUser";
    import UpcomingGameListItem from "./UpcomingGameListItem.svelte";
    if (userType === "refOfCounty") {
        const unsubscribeRefereeUpcomingGames = refUpcomingGames.subscribe(
            (value) => {
                games = value;
            }
        );
        onDestroy(unsubscribeRefereeUpcomingGames);
    }

    $: if (games.length > 0) {
        console.log("Games" + games);
        for (let i = 0; i < games.length; i++) {
            if (games[i].competition.isNational) {
                countyGames = [...countyGames, games[i]];
            } else {
                clubGames = [...clubGames, games[i]];
            }
        }
    }
</script>

{#if countyGames.length > 0}
    <UpcomingGameListItem heading="Upcoming County Games" games={countyGames} />
{/if}
{#if clubGames.length > 0}
    <UpcomingGameListItem heading="Upcoming Club Games" games={clubGames} />
{/if}
