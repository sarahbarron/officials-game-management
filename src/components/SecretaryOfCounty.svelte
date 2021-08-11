<script lang="ts">
    import Card from "./Card.svelte";
    import {
        secCountyUpcomingClubGames,
        secCountyUpcomingCountyGames,
    } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    import AccordionBody from "./AccordionBody.svelte";
    let buttonText: string = "Go To Secretary Of County Dashboard";
    let redirectUrl: string = "secretary-of-county";
    let clubGames = [];
    let countyGames = [];
    let clubCardHeader: string = "Upcoming Club Games";
    let countyCardHeader: string = "Upcoming County Games";
    const unsubscribeClubGames = secCountyUpcomingClubGames.subscribe(
        (value) => {
            clubGames = value;
        }
    );
    onDestroy(unsubscribeClubGames);

    const unsbuscribeCountyGames = secCountyUpcomingCountyGames.subscribe(
        (value) => {
            countyGames = value;
        }
    );
    onDestroy(unsbuscribeCountyGames);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card cardHeader={countyCardHeader} games={countyGames} />
<Card cardHeader={clubCardHeader} games={clubGames} />
