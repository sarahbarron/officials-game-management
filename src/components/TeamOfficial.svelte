<script lang="ts">
    import Card from "./Card.svelte";
    import { teamOfficialUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming Games";
    const unsubscribeTeamOfficial = teamOfficialUpcomingGames.subscribe(
        (value) => {
            games = value;
        }
    );
    onDestroy(unsubscribeTeamOfficial);
</script>

<Card {cardHeader} {games} innerCard="upcoming" />
