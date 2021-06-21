<script lang="ts">
    import AccordionItem from "./AccordionItem.svelte";
    export let referee: boolean = false;
    export let team_official: boolean = false;
    export let secretary_of_council: boolean = false;
    export let secretary_of_province: boolean = false;
    export let secretary_of_county: boolean = false;
    export let secretary_of_club: boolean = false;
</script>

<div class="accordion" id="accordionExample">
    {#if referee}
        <AccordionItem
            headingId="refereeHeading"
            bodyId="refereeBody"
            headingText="Referee"
            userType="referee"
        />
    {/if}
    {#if team_official}
        <AccordionItem
            headingId="teamOfficialHeading"
            bodyId="teamOfficialBody"
            headingText="Team Official"
            userType="teamOfficial"
        />
    {/if}
    {#if secretary_of_council}
        <AccordionItem
            headingId="secOfCouncilHeading"
            bodyId="secOfCouncilBody"
            headingText="Secretary - Council"
            userType="secOfCouncil"
        />
    {/if}
    {#if secretary_of_province}
        <AccordionItem
            headingId="secOfProvinceHeading"
            bodyId="secOfProvinceBody"
            headingText="Secretary - Provincial"
            userType="secOfProvince"
        />
    {/if}
    {#if secretary_of_county}
        <AccordionItem
            headingId="secOfCountyHeading"
            bodyId="secOfCountyBody"
            headingText="Secretary - County"
            userType="secOfCounty"
        />
    {/if}
    {#if secretary_of_club}
        <AccordionItem
            headingId="secOfClubHeading"
            bodyId="secOfClubBody"
            headingText="Secretary - Club"
            userType="secOfClub"
        />
    {/if}
</div>
