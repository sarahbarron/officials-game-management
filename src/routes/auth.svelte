<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import Logo from "../components/Logo.svelte";
    export let qs;

    qs.action = qs.action || "register";
    if (!["login", "register"].includes(qs.action)) qs.action = "register";
</script>

<h1 class="w3-center w3-jumbo">GAA Game Management Login</h1>
<Auth
    authMode={qs.action}
    on:auth={() => (window.location.href = qs.next || "/")}
/>
