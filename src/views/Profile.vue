<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-4">
          <profile-card />
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Profile</p>
                <argon-button color="success" size="sm" class="ms-auto">Settings</argon-button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <label for="json-input" class="form-control-label">Configuration</label>
                  <textarea
                    id="json-input"
                    class="form-control"
                    rows="10"
                    v-model="jsonData"
                    placeholder='{"username": "JohnDoe", "email": "john@example.com"}'
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      jsonData: `{
  "username": "",
  "email": "",
  "firstName": "",
  "lastName": "",
  "address": "",
  "city": "",
  "country": "",
  "postalCode": "",
  "aboutMe": ""
}`
    };
  },
  methods: {
    validateJSON() {
      try {
        JSON.parse(this.jsonData);
        alert("Valid JSON!");
      } catch (e) {
        alert("Invalid JSON!");
      }
    }
  },
  components: { ProfileCard, ArgonButton },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  }
};
</script>
