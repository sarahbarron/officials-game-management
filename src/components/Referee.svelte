<script lang="ts">
    import Card from "./Card.svelte";
    import { refUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";

    let games = [];

    const unsubscribeRefereeUpcomingGames = refUpcomingGames.subscribe(
        (value) => {
            games = value;
        }
    );
    onDestroy(unsubscribeRefereeUpcomingGames);
</script>

<Card cardHeader="Upcoming Games" innerCard="upcoming" {games} />
