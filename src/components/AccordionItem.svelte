<script lang="ts">
    import AccordionHeading from "./AccordionHeading.svelte";
    import AccordionOuterBody from "./AccordionBody.svelte";
    export let headingId: string = "";
    export let bodyId: string = "";
    export let headingText: string = "";
    export let userType: string = "";
</script>

<div class="accordion-item">
    <AccordionHeading {headingId} {bodyId} {headingText} />
    <AccordionOuterBody {headingId} {bodyId} {userType} />
</div>
