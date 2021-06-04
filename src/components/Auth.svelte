<script lang="ts">
    import { auth, googleAuth } from "../services/firebase";
    import { createEventDispatcher, onDestroy } from "svelte";
    import ErrorAlert from "./ErrorAlert.svelte";
    import {
        user,
        userEmail,
        refereeOfClub,
        refereeOfCounty,
        secretaryOfClub,
        secretaryOfCounty,
        secretaryOfProvince,
        secretaryOfCouncil,
        teamOfficial,
        firstName,
        lastName,
        clubRef,
        teams,
        games,
        clubCrest,
        countyCrest,
        clubName,
        countyName,
        provinceName,
    } from "../services/storeUser";
    import { getMember } from "../services/getUserDetails";

    let isAuthenticated = false;
    let err: string | null = null;

    const eventDispatch = createEventDispatcher();

    let user_email: string;
    const unsubscribeUserEmail = userEmail.subscribe((value) => {
        user_email = value;
    });
    onDestroy(unsubscribeUserEmail);

    $: if (user_email != null && user_email != undefined && user_email != "") {
        console.log(`User Email ${user_email}`);
        getMember(user_email);
    }
    // only authenticate the user if the user is not already authenticated
    auth.onAuthStateChanged((user) => {
        isAuthenticated = !!user;
        if (user) {
            eventDispatch("auth");
        }
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
            .then((userCredential) => {
                let authUser = result.user;
                let email = result.user.email;
                user.set(authUser);
                userEmail.set(email);
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    function google() {
        auth.signInWithPopup(googleAuth)
            .then((result) => {
                let authUser = result.user;
                let email = result.user.email;
                user.set(authUser);
                userEmail.set(email);
                eventDispatch("auth");
                eventDispatch("done");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message} ${e.email} ${e.credential}`;
            });
    }
    function logout() {
        if (auth.currentUser) {
            auth.signOut()
                .then(() => {
                    eventDispatch("done");
                    eventDispatch("logout");
                    resetStore();
                })
                .catch((e) => {
                    throw new Error(e);
                });
        }
    }

    const resetStore = () => {
        user.set({});
        userEmail.set("");
        refereeOfClub.set(false);
        refereeOfCounty.set(false);
        secretaryOfClub.set(false);
        secretaryOfCounty.set(false);
        secretaryOfProvince.set(false);
        secretaryOfCouncil.set(false);
        teamOfficial.set(false);
        firstName.set("");
        lastName.set("");
        clubRef.set("");
        teams.set([]);
        games.set([]);
        clubCrest.set("");
        countyCrest.set("");
        clubName.set("");
        countyName.set("");
        provinceName.set("");
    };
</script>

<div id="login-card" class="card mb-50 center">
    <div class="card-body">
        {#if !isAuthenticated}
            <div>
                <h2>GAA Officials Login</h2>
            </div>
            <div>
                <form on:submit|preventDefault={login}>
                    {#if err}
                        <div>
                            <ErrorAlert message={err} />
                        </div>
                    {/if}

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
                                ><i class="fa fa-google font-icons" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        {:else}
            <div class="col-12">
                <h2>Logged in</h2>
            </div>
            <div class="col-12 center-btn">
                <button class="btn btn-primary" on:click={logout}>
                    Log out
                    <i class="fa fa-sign-out font-icons" />
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    .font-icons {
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
