<script lang="ts">
    import AccordionButtons from "./RedirectToDashboardButton.svelte";
    import Card from "./Card.svelte";
    import { secClubUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    let buttonText = "Go To Secretary Of Club Dashboard";
    let redirectUrl = "secretary-of-club";
    let games = [];
    let cardHeader: string = "Upcoming Games";
    const unsubscribeSecOfClubUpcomingGames = secClubUpcomingGames.subscribe(
        (value) => {
            games = value;
        }
    );
    onDestroy(unsubscribeSecOfClubUpcomingGames);
</script>

<AccordionButtons {buttonText} {redirectUrl} />
<Card {cardHeader} {games} />
