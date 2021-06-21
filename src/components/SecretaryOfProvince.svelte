<script lang="ts">
    import Card from "./Card.svelte";
    import { secProvinceUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming County Provincial Games";
    const unsubscribeSecretary = secProvinceUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<Card {cardHeader} {games} innerCard="upcoming" />
