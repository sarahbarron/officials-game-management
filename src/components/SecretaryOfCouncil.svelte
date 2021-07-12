<script lang="ts">
    import Card from "./Card.svelte";
    import { secCouncilUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    let buttonText: string = "Go To Secretary Of Council Dashboard";
    let redirectUrl: string = "secrtary-of-council";
    let games = [];
    let cardHeader: string = "Upcoming National Games";
    const unsubscribeSecretary = secCouncilUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card {cardHeader} innerCard="upcoming" {games} />
