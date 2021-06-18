<script lang="ts">
    import Card from "./Card.svelte";
    export let cardHeader: string = "";
    export let innerCard: string = "";
    export let userType: string = "";
</script>

<Card {cardHeader} {innerCard} {userType} />
