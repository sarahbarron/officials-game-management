<script lang="ts">
    export let headingId: string = "";
    export let bodyId: string = "";
    export let headingText: string = "";
</script>

<h2 class="accordion-header" id={headingId}>
    <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#{bodyId}"
        aria-controls={bodyId}
        aria-expanded="false"
    >
        {headingText}
    </button>
</h2>

<style>
    .accordion-button {
        color: #005e82 !important;
        background-color: white !important;
        font-family: "Neuton", serif;
        font-size: 20px;
    }
    @media (min-width: 768px) {
        .accordion-button {
            font-size: 25px;
        }
    }
</style>
