<script lang="ts">
    import Card from "./Card.svelte";
    import { secCountyUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    let buttonText: string = "Go To Secretary Of County Dashboard";
    let redirectUrl: string = "secretary-of-county";
    let games = [];
    let cardHeader: string = "Upcoming Club Games";
    const unsubscribeSecretary = secCountyUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card {cardHeader} {games} innerCard="upcoming" />
