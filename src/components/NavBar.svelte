<script lang="ts">
    // import {
    //     refereeOfClub,
    //     refereeOfCounty,
    //     secretaryOfClub,
    //     secretaryOfCouncil,
    //     secretaryOfCounty,
    //     secretaryOfProvince,
    //     teamOfficial,
    // } from "../services/storeUser";
    import { onDestroy } from "svelte";
    import NavUl from "./NavUl.svelte";
    import NavBrand from "./NavBrand.svelte";
    import NavToggleBtn from "./NavToggleBtn.svelte";

    // let secretary_of_council: boolean;
    // const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value) => {
    //     secretary_of_council = value;
    // });
    // onDestroy(unsubcribeSecOfCouncil);

    // let secretary_of_province: boolean;
    // const unsubcribeSecOfProvince = secretaryOfProvince.subscribe((value) => {
    //     secretary_of_province = value;
    // });
    // onDestroy(unsubcribeSecOfProvince);

    // let secretary_of_county: boolean;
    // const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value) => {
    //     secretary_of_county = value;
    // });
    // onDestroy(unsubcribeSecOfCounty);

    // let secretary_of_club: boolean;
    // const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
    //     secretary_of_club = value;
    // });
    // onDestroy(unsubcribeSecOfClub);

    // let team_official: boolean;
    // const unsubcribeTeamOfficial = teamOfficial.subscribe((value) => {
    //     team_official = value;
    // });
    // onDestroy(unsubcribeTeamOfficial);

    // let referee_of_club: boolean;
    // const unsubcribeRefOfClub = refereeOfClub.subscribe((value) => {
    //     referee_of_club = value;
    // });
    // onDestroy(unsubcribeRefOfClub);

    // let referee_of_county: boolean;
    // const unsubcribeRefOfCounty = refereeOfCounty.subscribe((value) => {
    //     referee_of_county = value;
    // });
    // onDestroy(unsubcribeRefOfCounty);
</script>

<nav id="nav-bar" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <NavBrand />
        <NavToggleBtn />
        <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavDarkDropdown"
        >
            <NavUl />
        </div>
    </div>
</nav>

<style>
    @media (min-width: 768px) {
        #nav-bar {
            padding: 0px 50px;
        }
        nav {
            margin-bottom: 70px;
        }
    }
</style>
