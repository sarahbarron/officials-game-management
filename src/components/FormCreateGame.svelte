<script lang="ts">
    import { memberId } from "../services/storeUser";

    import FormCreateGameDetails from "./FormCreateGameDetails.svelte";
    import FormCreateMatchOfficials from "./FormCreateMatchOfficials.svelte";
    import { onDestroy } from "svelte";
    import {
        createGameInFirestore,
        createGame,
    } from "../services/firebaseQueries";
    import { db } from "../services/firebase";
    import { Circle3 } from "svelte-loading-spinners";

    // spinner when a game is created
    $: showSpinner = false;
    // Club / County Radio Buttons
    $: cantBeCounty = false;
    $: cantBeClub = false;

    // Venue options
    export let venueOptions = [];
    $: filteredVenues = venueOptions;
    // Competition options
    export let competitionOptions = [];
    $: filteredCompetitions = competitionOptions;
    // Team options
    export let teamOptions = [];
    $: filteredTeamsA = teamOptions;
    $: filteredTeamsB = teamOptions;
    // Referee
    export let refereeOptions = [];
    $: filteredReferees = refereeOptions;

    let member_Id: string;
    const unsubscribeMemberId = memberId.subscribe((value) => {
        member_Id = value;
    });
    onDestroy(unsubscribeMemberId);

    async function createNewGame(event) {
        try {
            showSpinner = true;
            setTimeout(() => {
                showSpinner = false;
            }, 15000);
            let memberId = member_Id;
            let date = event.target.datePicker.value;
            let time = event.target.time.value;
            let venueId = event.target.venueSelect.value;
            let competitionId = event.target.competitionSelect.value;
            let teamAId = event.target.teamASelect.value;
            let teamBId = event.target.teamBSelect.value;
            let refereeId = event.target.refereeSelect.value;
            let subReferee = event.target.subRefereeSelect.value;
            let linesman1 = event.target.linesman1.value;
            let linesman2 = event.target.linesman2.value;
            let umpire1 = event.target.umpire1.value;
            let umpire2 = event.target.umpire2.value;
            let umpire3 = event.target.umpire3.value;
            let umpire4 = event.target.umpire4.value;
            firestoreCreateGame(
                memberId,
                date,
                time,
                venueId,
                competitionId,
                teamAId,
                teamBId,
                refereeId,
                subReferee,
                linesman1,
                linesman2,
                umpire1,
                umpire2,
                umpire3,
                umpire4
            );
        } catch (e) {
            console.error(`createGame exception ${e}`);
        }
    }

    let firestoreCreateGame = async (
        memberId: string,
        date: any,
        time: any,
        venueId: string,
        competitionId: string,
        teamAId: string,
        teamBId: string,
        refereeId: string,
        subReferee: string,
        linesman1: any,
        linesman2: any,
        umpire1: any,
        umpire2: any,
        umpire3: any,
        umpire4: any
    ) => {
        let game = await createGameInFirestore(
            memberId,
            date,
            time,
            venueId,
            competitionId,
            teamAId,
            teamBId,
            refereeId,
            subReferee,
            linesman1,
            linesman2,
            umpire1,
            umpire2,
            umpire3,
            umpire4
        );

        let gameDoc = await db.collection("Game").doc(game.id).get();

        await createGame(gameDoc);
    };
</script>

<div class="card">
    <div class="card-header"><h2>Create Game</h2></div>
    <div class="card-body">
        <form
            on:submit|preventDefault={createNewGame}
            action=""
            class="needs-validation"
            data-toggle="validator"
        >
            <div class="row">
                <FormCreateGameDetails
                    {filteredVenues}
                    {filteredCompetitions}
                    {filteredTeamsA}
                    {filteredTeamsB}
                    {cantBeClub}
                    {cantBeCounty}
                />
                <FormCreateMatchOfficials {filteredReferees} />
            </div>
            <div class="d-flex align-items-end flex-column">
                <button type="submit" class="btn btn-primary"
                    >Create Game</button
                >
                {#if showSpinner}
                    <Circle3
                        size="60"
                        ballTopLeft="#00ff11"
                        ballTopRight="#005E82"
                        ballBottomRight="#fcfc07"
                        ballBottomLeft="#fa00ff"
                        unit="px"
                        duration="1s"
                    />
                    <h3>Creating Game .....</h3>
                {/if}
            </div>
        </form>
    </div>
</div>

<style>
    form,
    button {
        font-size: 20px;
    }
    .card {
        margin-bottom: 20px;
    }
</style>
