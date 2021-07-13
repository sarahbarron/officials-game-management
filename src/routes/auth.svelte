<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import Logo from "../components/Logo.svelte";
    import router from "page";
    import Footer from "../components/Footer.svelte";
    import Heading1 from "../components/Heading1.svelte";
    export let qs;
    let heading: string = "GAA Game Management Login";
    qs.action = qs.action || "login";
    if (!["login"].includes(qs.action)) qs.action = "login";
</script>

<div id="page-container">
    <div class="container-fluid">
        <div class="padding-for-footer">
            <Heading1 {heading} />
            <!-- <h1 class="w3-center w3-jumbo">GAA Game Management Login</h1> -->
            <div class="row no-gutters">
                <Logo />
                <Auth on:auth={() => router.redirect("/home")} />
            </div>
        </div>
        <div id="auth-footer">
            <Footer />
        </div>
    </div>
</div>

<style>
    .row {
        margin-top: 50px;
    }
    #auth-footer {
        position: relative;
    }
</style>
