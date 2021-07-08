<script lang="ts">
    import Card from "./Card.svelte";
    import { teamOfficialUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming Games";
    const unsubscribeTeamOfficial = teamOfficialUpcomingGames.subscribe(
        (value) => {
            games = value;
            for (let x = 0; x < games.length - 1; x++) {
                console.log("teamOfficial component" + games[x].id);
            }
        }
    );
    onDestroy(unsubscribeTeamOfficial);
</script>

<Card {cardHeader} {games} innerCard="upcoming" />
