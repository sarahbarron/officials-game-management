<script lang="ts">
    import { getMatchCards, getMemberName } from "../services/firebaseQueries";
    import MatchReportCardsOrderedFromField from "../components/MatchReportCardsOrderedFromField.svelte";
    import MatchReportCautionedCards from "../components/MatchReportCautionedCards.svelte";
    export let gameId = "";
    export let teamA = "";
    export let teamAid = "";
    export let teamB = "";
    export let teamBid = "";
    $: redCards = [];
    $: yellowCards = [];
    $: blackCards = [];
    $: twoCards = [];
    $: allCards = [];

    $: if (gameId != "") {
        getAllCards(gameId);
    }

    let getAllCards = async (gameId) => {
        let i = 0;
        let cardsPromise = await getMatchCards(gameId);
        if (cardsPromise != null && cardsPromise != undefined) {
            if (cardsPromise.size > 0) {
                cardsPromise.forEach(async (doc) => {
                    let id = doc.id;
                    let color = doc.data().color;
                    let member = doc.data().member.id;
                    let memberName = await getMemberName(doc.data().member.id);
                    let note = doc.data().note;
                    let team = doc.data().team.id;
                    let card = {
                        id: id,
                        color: color,
                        member: member,
                        memberName: memberName,
                        note: note,
                        team: team,
                    };

                    if (!allCards.includes(card)) {
                        allCards = [...allCards, card];
                    }

                    if (
                        allCards != null &&
                        allCards != undefined &&
                        i == cardsPromise.size - 1
                    ) {
                        // get the members from the all the cards and remove duplicates
                        redCards = allCards.filter((card) =>
                            card.color.includes("red")
                        );
                        let notRedCards = allCards.filter(
                            (card) =>
                                card.color.includes("yellow") ||
                                card.color.includes("black")
                        );

                        let members = [];
                        notRedCards.map(
                            ({ member }) => (members = [...members, member])
                        );
                        let reducedMembers = [...new Set(members)];

                        reducedMembers.forEach((memberId) => {
                            let membersYellowAndBlackCards = notRedCards.filter(
                                (card) => card.member.includes(memberId)
                            );
                            if (membersYellowAndBlackCards.length == 1) {
                                if (
                                    membersYellowAndBlackCards[0].color ==
                                    "yellow"
                                ) {
                                    yellowCards = [
                                        ...yellowCards,
                                        membersYellowAndBlackCards[0],
                                    ];
                                } else if (
                                    membersYellowAndBlackCards[0].color ==
                                    "black"
                                ) {
                                    blackCards = [
                                        ...blackCards,
                                        membersYellowAndBlackCards[0],
                                    ];
                                }
                            } else if (membersYellowAndBlackCards.length > 1) {
                                twoCards = [
                                    ...twoCards,
                                    ...membersYellowAndBlackCards,
                                ];
                            }
                        });
                    }
                    i++;
                });
            }
        }
    };
</script>

<div class="row">
    <div class="col-12">
        <MatchReportCardsOrderedFromField
            {redCards}
            {twoCards}
            {blackCards}
            {teamA}
            {teamB}
            {teamAid}
            {teamBid}
        />
    </div>
</div>
<br />
<div class="row">
    <div class="col-">
        <MatchReportCautionedCards
            {yellowCards}
            {teamA}
            {teamB}
            {teamAid}
            {teamBid}
        />
    </div>
</div>
