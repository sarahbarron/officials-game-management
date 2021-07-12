<script lang="ts">
    import Card from "./Card.svelte";
    import { refUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    let buttonText: string = "Go To Referee Dashboard";
    let redirectUrl: string = "referee";
    let games = [];

    const unsubscribeRefereeUpcomingGames = refUpcomingGames.subscribe(
        (value) => {
            games = value;
        }
    );
    onDestroy(unsubscribeRefereeUpcomingGames);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card cardHeader="Upcoming Games" innerCard="upcoming" {games} />
