<script lang="ts">
    import Card from "./Card.svelte";
    import { secClubUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let games = [];
    let cardHeader: string = "Upcoming Games";
    const unsubscribeSecOfClubUpcomingGames = secClubUpcomingGames.subscribe(
        (value) => {
            games = value;
        }
    );
    onDestroy(unsubscribeSecOfClubUpcomingGames);
</script>

<Card {cardHeader} innerCard="upcoming" {games} />
