<script lang="ts">
    import {
        getMatchSubstitutes,
        getMemberName,
    } from "../services/firebaseQueries";

    let heading: string = "Íonadaithe / Substitutes";
    export let gameId = "";
    export let teamA = "";
    export let teamB = "";
    export let teamAid = "";
    export let teamBid = "";

    $: allsubs = [];

    $: if (gameId != "") {
        getAllSubs(gameId);
    }

    let getAllSubs = async (gameId) => {
        let subsPromise = await getMatchSubstitutes(gameId);
        if (subsPromise != null && subsPromise != undefined) {
            if (subsPromise.size > 0) {
                subsPromise.forEach(async (doc) => {
                    let id = doc.id;
                    let blackcard = doc.data().blackcard;
                    let bloodsub = doc.data().bloodsub;
                    let playerOffName = await getMemberName(
                        doc.data().playerOff.id
                    );
                    let playerOnName = await getMemberName(
                        doc.data().playerOn.id
                    );
                    let team = doc.data().team.id;

                    let sub = {
                        id: id,
                        blackcard: blackcard,
                        bloodsub: bloodsub,
                        playerOff: playerOffName,
                        playerOn: playerOnName,
                        team: team,
                    };

                    if (!allsubs.includes(sub)) {
                        allsubs = [...allsubs, sub];
                    }
                });
            }
        }
    };
</script>

<div class="container">
    <h2>{heading}</h2>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Imreoirí / Player On</th>
                    <th scope="col">Imreoirí / Player Off</th>
                    <th scope="col">Contae/Club (County/ Club)</th>
                    <th scope="col">Bloodsub</th>
                </tr>
            </thead>
            <tbody>
                {#each allsubs as sub}
                    <tr>
                        <th
                            >{sub.playerOn.firstName}
                            {sub.playerOn.lastName}</th
                        >
                        <td
                            >{sub.playerOff.firstName}
                            {sub.playerOff.lastName}</td
                        >

                        {#if sub.team == teamAid}
                            <td>{teamA}</td>
                        {:else if sub.team == teamBid}
                            <td>{teamB}</td>
                        {:else}<td />
                        {/if}
                        {#if sub.bloodsub}
                            <td>Yes</td>
                        {:else}
                            <td>No</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
        padding-bottom: 50px;
        height: 100%;
    }
</style>
