<script lang="ts">
    import { auth, googleAuth } from "../services/firebase";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import ErrorAlert from "./ErrorAlert.svelte";

    export let authMode: "login" | "register" = "register";
    let isAuthenticated = false;
    let err: string | null = null;

    const eventDispatch = createEventDispatcher();

    // only authenticate the user if the user is not already authenticated
    auth.onAuthStateChanged((user) => {
        isAuthenticated = !!user;
        if (user) eventDispatch("auth");
    });

    function login() {
        // again, remove "as HTMLInputElement" if using js
        const email = (document.getElementById("l-email") as HTMLInputElement)
            .value;
        const password = (
            document.getElementById("l-password") as HTMLInputElement
        ).value;

        // basic form validation
        if (!email || !password) {
            err = "Fill out all fields!";
            return;
        }
        err = "";

        // sign in using firebase
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    function register() {
        const email = (document.getElementById("r-email") as HTMLInputElement)
            .value;
        const password = (
            document.getElementById("r-password") as HTMLInputElement
        ).value;
        const cpassword = (
            document.getElementById("r-cpassword") as HTMLInputElement
        ).value;

        // form validation
        if (!email || !password || !cpassword) {
            err = "Fill out all fields!";
            return;
        }
        if (password !== cpassword) {
            err = "Passwords don't match!";
            return;
        }
        err = "";

        // creating the user
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    function google() {
        auth.signInWithPopup(googleAuth)
            .then(() => {
                eventDispatch("auth");
                eventDispatch("done");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }
    function logout() {
        if (auth.currentUser) {
            auth.signOut()
                .then(() => {
                    eventDispatch("done");
                    eventDispatch("logout");
                })
                .catch((e) => {
                    throw new Error(e);
                });
        }
    }
</script>

<div id="login-card" class="card center">
    <div class="card-body">
        {#if !isAuthenticated}
            <div>
                <h2>GAA Officials Login</h2>
            </div>
            <div>
                <form>
                    <div>
                        {#if err}
                            <ErrorAlert message={err} />
                        {/if}
                    </div>
                    <div class="form-group">
                        <label for="l-email">Email</label>

                        <input
                            type="email"
                            class="form-control"
                            placeholder="Enter your email"
                            id="l-email"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="form-group">
                        <label for="l-password">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Enter your password"
                            id="l-password"
                        />
                    </div>

                    <div class="row">
                        <div class="col-12 col-lg-6 center-btn">
                            <button type="submit" class="btn btn-primary"
                                >Login</button
                            >
                        </div>
                        <div class="col-12 col-lg-6 ">
                            <button
                                class="btn btn-primary center-btn"
                                on:click={google}
                                ><i id="google-icon" class="fa fa-google" />
                                Sign in with Google</button
                            >
                        </div>
                    </div>
                </form>
            </div>
        {:else}
            <div class="w3-container">
                <h2>Logged in</h2>
            </div>
            <div class="w3-container">
                <p class="w3-large w3-text-green w3-center">
                    <i class="fas fa-check fa-5x" />
                </p>
                <p class="w3-center">Logged in</p>
                <p>
                    <button
                        class="center-btn"
                        style="width: 100%"
                        on:click={logout}>Log out</button
                    >
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    #google-icon {
        padding: 0px 10px;
    }

    .center-btn {
        text-align: center;
    }
    h2 {
        text-align: center;
        font-size: 20px;
    }

    .form-group {
        margin: 15px 0px;
    }
    button {
        width: 100%;
        margin: 20px 0px 10px 0px;
    }

    #login-card {
        margin-bottom: 50px;
        width: 100vw;
    }

    @media (min-width: 768px) {
        h2 {
            font-size: xx-large;
            text-align: center;
        }
        #login-card {
            max-width: 750px;
        }
        .center {
            margin: auto;
            width: 50%;
            border: 3px solid #005e82;
            padding: 10px;
        }

        button {
            width: 80%;
            height: 50px;
            margin: 10px;
        }
    }
</style>
