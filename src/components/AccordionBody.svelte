<script lang="ts">
    import { secretaryOfProvince } from "../services/storeUser";
    import Referee from "./Referee.svelte";
    import SecretaryOfClub from "./SecretaryOfClub.svelte";
    import SecretaryOfCouncil from "./SecretaryOfCouncil.svelte";
    import SecretaryOfCounty from "./SecretaryOfCounty.svelte";
    import SecretaryOfProvince from "./SecretaryOfProvince.svelte";
    import TeamOfficial from "./TeamOfficial.svelte";

    export let headingId: string = "";
    export let bodyId: string = "";
    export let userType: string = "";
</script>

<div
    id={bodyId}
    class="accordion-collapse collapse"
    aria-labelledby={headingId}
    data-bs-parent="#accordionExample"
>
    <div class="accordion-body">
        {#if userType === "referee"}
            <Referee />
        {:else if userType === "teamOfficial"}
            <TeamOfficial />
        {:else if userType === "secOfCouncil"}
            <SecretaryOfCouncil />
        {:else if userType === "secOfProvince"}
            <SecretaryOfProvince />
        {:else if userType === "secOfCounty"}
            <SecretaryOfCounty />
        {:else if userType === "secOfClub"}
            <SecretaryOfClub />
        {/if}
    </div>
</div>
