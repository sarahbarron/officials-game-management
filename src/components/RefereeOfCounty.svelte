<script lang="ts">
    import Card from "./Card.svelte";
    import { memberDocument, refereeOfCounty } from "../services/storeUser";
    import { getRefereeUpcomingGames } from "../services/getUserDetails";
    import { onDestroy } from "svelte";
    let cardHeader: string = "Referee - County";

    // Subsribe to store values

    let member_document: string;
    const unsubscribeMemberDocument = memberDocument.subscribe((value) => {
        member_document = value;
    });
    onDestroy(unsubscribeMemberDocument);

    let isRefereeOfCounty: boolean;
    const unsubscribeIsRefOfCounty = refereeOfCounty.subscribe((value) => {
        isRefereeOfCounty = value;
    });
    onDestroy(unsubscribeIsRefOfCounty);
    $: if (isRefereeOfCounty) {
        getRefereeUpcomingGames(member_document);
    }
</script>

<Card {cardHeader} />
