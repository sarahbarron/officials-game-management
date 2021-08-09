<script lang="ts">
    export let teamA: string = "";
    export let teamB: string = "";
    let heading: string = "Íonadaithe / Substitutes";
</script>

<div class="container">
    <h2>{heading}</h2>

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
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
        </tbody>
    </table>
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
