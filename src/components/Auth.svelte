<script lang="ts">
    import { auth, googleAuth } from "../services/firebase";
    import { createEventDispatcher, onDestroy } from "svelte";
    import ErrorAlert from "./ErrorAlert.svelte";
    import { resetStore, userEmail } from "../services/storeUser";
    import { getMember } from "../services/firebaseQueries";
    import Logout from "./Logout.svelte";

    let isAuthenticated = false;
    let err: string | null = null;
    resetStore();
    const eventDispatch = createEventDispatcher();

    // Subscribe to user email
    let user_email: string;
    const unsubscribeUserEmail = userEmail.subscribe((value) => {
        user_email = value;
    });
    onDestroy(unsubscribeUserEmail);

    // If the user email is updated get the member details
    $: if (user_email != null && user_email != undefined && user_email != "") {
        console.log(`User Email ${user_email}`);
        getMember(user_email);
    }
    // // only authenticate the user if the user is not already authenticated
    // auth.onAuthStateChanged((user) => {
    //     isAuthenticated = !!user;
    //     if (user) {
    //         eventDispatch("auth");
    //     }
    // });

    // Login with email and password
    function login() {
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
                let email = userCredential.user.email;
                userEmail.set(email);
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    // Sign in with google
    function google() {
        auth.signInWithPopup(googleAuth)
            .then((result) => {
                let email = result.user.email;
                userEmail.set(email);
                eventDispatch("auth");
                eventDispatch("done");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message} ${e.email} ${e.credential}`;
            });
    }
</script>

<div id="auth-div" class="col-12 col-lg-7">
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
                    <Logout />
                </div>
            {/if}
        </div>
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
        #login-card {
            width: 100%;
        }
        #auth-div {
            margin: 100px 10px;
        }
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
