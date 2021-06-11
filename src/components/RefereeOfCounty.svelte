<script lang="ts">
    import Card from "./Card.svelte";
    import {
        memberDocument,
        refereeOfCounty,
        refUpcomingGames,
    } from "../services/storeUser";
    import { getRefereeUpcomingGames } from "../services/firebaseQueries";
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

    let refereeUpcomingGames: [];
    const unsubscribeRefereeUpcomingGames = refUpcomingGames.subscribe(
        (value) => {
            refereeUpcomingGames = value;
        }
    );
    onDestroy(unsubscribeRefereeUpcomingGames);

    $: if (isRefereeOfCounty) {
        getRefereesGames();
    }

    const getRefereesGames = async () => {
        await getRefereeUpcomingGames(member_document);
    };
    $: if (refereeUpcomingGames.length > 0) {
        console.log(refereeUpcomingGames);
    }
</script>

<Card {cardHeader} />
