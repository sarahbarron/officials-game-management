<script lang="ts">
    import HeaderCard from "../components/HeaderCard.svelte";
    import BodyCard from "./BodyCard.svelte";
    export let cardHeader: string = "";
</script>

<div class="card">
    <HeaderCard {cardHeader} />
    <BodyCard />
</div>
