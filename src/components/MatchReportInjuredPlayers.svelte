<script lang="ts">
    import { getInjuries, getMemberName } from "../services/firebaseQueries";

    let heading: string = "Ímreoirí Gorthaithe (Injured Players)";
    export let gameId = "";
    export let teamA = "";
    export let teamB = "";
    export let teamAid = "";
    export let teamBid = "";

    $: allInjuries = [];

    $: if (gameId != "") {
        getAllInjuries(gameId);
    }

    // Get all the injuries for this game and store the details needed for the
    // match report in the allInjuries array
    let getAllInjuries = async (gameId) => {
        let injuriesPromise = await getInjuries(gameId);
        if (injuriesPromise != null && injuriesPromise != undefined) {
            if (injuriesPromise.size > 0) {
                injuriesPromise.forEach(async (doc) => {
                    let id = doc.id;
                    let member = await getMemberName(doc.data().member.id);
                    let note = doc.data().note;
                    let team = doc.data().team.id;

                    let injury = {
                        id: id,
                        member: member,
                        team: team,
                        note: note,
                    };

                    if (!allInjuries.includes(injury)) {
                        allInjuries = [...allInjuries, injury];
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
                    <th scope="col">Imreoirí / Player </th>
                    <th scope="col">Contae/Club (County/ Club)</th>
                    <th scope="col">Nature of Injury</th>
                </tr>
            </thead>
            <tbody>
                {#each allInjuries as injury}
                    <tr>
                        <th scope="row"
                            >{injury.member.firstName}
                            {injury.member.lastName}</th
                        >
                        {#if injury.team == teamAid}
                            <td>{teamA}</td>
                        {:else if injury.team == teamBid}
                            <td>{teamB}</td>
                        {:else}
                            <td />
                        {/if}

                        <td>{injury.note}</td>
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
    }
</style>
