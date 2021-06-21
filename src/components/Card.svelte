<script lang="ts">
    import HeaderCard from "../components/HeaderCard.svelte";
    import BodyCard from "./BodyCard.svelte";
    export let cardHeader: string = "";
    export let innerCard: string = "";
    export let games = [];
</script>

<div class="card">
    <HeaderCard {cardHeader} />
    <BodyCard {innerCard} {games} />
</div>
