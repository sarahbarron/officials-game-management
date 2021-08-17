<script lang="ts">
    import {
        clubRef,
        memberId,
        refereeOfClub,
        refereeOfCounty,
        secCouncilUpcomingGames,
        secCountyUpcomingClubGames,
        secCountyUpcomingCountyGames,
        secProvinceUpcomingGames,
        secretaryOfClub,
        secretaryOfCouncil,
        secretaryOfCounty,
        secretaryOfProvince,
        teamOfficial,
    } from "../services/storeUser";

    import FormCreateGameDetails from "./FormCreateGameDetails.svelte";
    import FormCreateMatchOfficials from "./FormCreateMatchOfficials.svelte";
    import { onDestroy } from "svelte";
    import {
        createGameInFirestore,
        createGame,
    } from "../services/firebaseQueries";
    import { db } from "../services/firebase";

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

    // $: console.log(`Venues: ${venueOptions}`);
    // $: console.log(`Competitins ${competitionOptions}`);
    // $: console.log(`Teams ${teamOptions}`);
    // $: console.log(`Referee ${refereeOptions}`);

    let member_Id: string;
    const unsubscribeMemberId = memberId.subscribe((value) => {
        member_Id = value;
    });
    onDestroy(unsubscribeMemberId);

    function createNewGame(event) {
        try {
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
        let createdGame = await createGame(gameDoc);
        updateStoredGames(createdGame);
    };

    let updateStoredGames = async (game) => {
        // If the user is secretary of council update the games
        let secretary_of_council: boolean;
        const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value) => {
            secretary_of_council = value;
        });
        onDestroy(unsubcribeSecOfCouncil);

        if (secretary_of_council) {
            let upcoming_games = [];
            const unsubscribeSecOfCouncilUpcomingGame =
                secCouncilUpcomingGames.subscribe((value) => {
                    upcoming_games = value;
                });
            onDestroy(unsubscribeSecOfCouncilUpcomingGame);
            upcoming_games = [...upcoming_games, game];
            secCouncilUpcomingGames.set(upcoming_games);
        }

        //  If the user is secretary of province update the games
        let secretary_of_province: boolean;
        const unsubcribeSecOfProvince = secretaryOfProvince.subscribe(
            (value) => {
                secretary_of_province = value;
            }
        );
        onDestroy(unsubcribeSecOfProvince);

        if (secretary_of_province) {
            let upcoming_games = [];
            const unsubscribeSecOfProvinceUpcomingGame =
                secProvinceUpcomingGames.subscribe((value) => {
                    upcoming_games = value;
                });
            onDestroy(unsubscribeSecOfProvinceUpcomingGame);
            upcoming_games = [...upcoming_games, game];
            secProvinceUpcomingGames.set(upcoming_games);
        }

        // If the user is secretary of county update the games
        let secretary_of_county: boolean;
        const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value) => {
            secretary_of_county = value;
        });
        onDestroy(unsubcribeSecOfCounty);

        if (secretary_of_county) {
            let upcoming_games = [];
            const unsubscribeSecOfCountyUpcomingGame =
                secCountyUpcomingClubGames.subscribe((value) => {
                    upcoming_games = value;
                });
            onDestroy(unsubscribeSecOfCountyUpcomingGame);
            upcoming_games = [...upcoming_games, game];
            secCountyUpcomingClubGames.set(upcoming_games);
        }
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
