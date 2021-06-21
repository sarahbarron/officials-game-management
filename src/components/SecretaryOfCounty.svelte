<script lang="ts">
    import Card from "./Card.svelte";
    import { secCountyUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming Club Games";
    const unsubscribeSecretary = secCountyUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<Card {cardHeader} {games} innerCard="upcoming" />
