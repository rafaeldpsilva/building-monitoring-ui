<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                      <argon-input v-model="username" value="username" placeholder="Username" name="username" size="lg" />
                    </div>
                    <div class="mb-3">
                      <argon-input v-model="password" type="password" placeholder="Password" name="password" size="lg" />
                    </div>
                    <argon-switch id="rememberMe">Remember me</argon-switch>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="login"
                      >Sign in</argon-button>
                    </div>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://tiocps.pt/img/bg1.jpg');
          background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h1
                  class="mt-5 text-white font-weight-bolder position-relative"
                >Caravels</h1>
                <p
                  class="text-white position-relative"
                >Intelligent Communities of Cyber-Physical Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import LoginService from "../services/LoginService";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  data() {
    return {
      username: '',
      password: '',
      community: [],
    };
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
   created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeMount() {
    this.login();
  },
  methods: {
      async login() {
        this.community = await LoginService.getCommunity()
        for (let i = 0; i < this.community.length; i++) {
          if (this.username == this.community[i]['name']){
            //localStorage.setItem("name", this.username)
            //localStorage.setItem("uri", this.community[i]['uri'])
            //localStorage.setItem("token", this.community[i]['token'])
            //localStorage.setItem("overview", JSON.stringify([]))
            //localStorage.setItem("forecast", JSON.stringify([]))
            //localStorage.setItem("iots", JSON.stringify([]))
            //localStorage.setItem("batteries", JSON.stringify([]))
            //localStorage.setItem("batteries_historic", JSON.stringify([0]))
            this.validUser = true
            this.$router.push({ path: 'dashboard-default' })
            this.$store.commit('login',[this.username, this.community[i]['uri'], this.community[i]['token']]);
          } else {
            this.validUser = false
          }
        }
      },
    },
};
</script>
