<script lang="ts">
    import Card from "./Card.svelte";
    import { secProvinceUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    let buttonText: string = "Go To Secretary Of Province Dashboard";
    let redirectUrl: string = "secretary-of-province";
    let games = [];
    let cardHeader: string = "Upcoming County Provincial Games";
    const unsubscribeSecretary = secProvinceUpcomingGames.subscribe((value) => {
        games = value;
    });
    onDestroy(unsubscribeSecretary);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card {cardHeader} {games} innerCard="upcoming" />
