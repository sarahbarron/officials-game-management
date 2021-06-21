<script lang="ts">
    import Card from "./Card.svelte";
    import { secCouncilUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming National Games";
    const unsubscribeSecretary = secCouncilUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<Card {cardHeader} innerCard="upcoming" {games} />
