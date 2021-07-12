<script lang="ts">
    import Card from "./Card.svelte";
    import { teamOfficialUpcomingGames } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import AccordionButton from "./RedirectToDashboardButton.svelte";
    let buttonText: string = "Go To Team Official Dashboard";
    let redirectUrl: string = "team-official";
    let games = [];
    let cardHeader: string = "Upcoming Games";
    const unsubscribeTeamOfficial = teamOfficialUpcomingGames.subscribe(
        (value) => {
            games = value;
            for (let x = 0; x < games.length - 1; x++) {
                console.log("teamOfficial component" + games[x].id);
            }
        }
    );
    onDestroy(unsubscribeTeamOfficial);
</script>

<AccordionButton {buttonText} {redirectUrl} />
<Card {cardHeader} {games} innerCard="upcoming" />
