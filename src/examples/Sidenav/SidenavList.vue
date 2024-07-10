<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/iots"
          :class="getRoute() === 'iots' ? 'active' : ''"
          :navText="'IoTs'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-bullet-list-67 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/divisions"
          :class="getRoute() === 'divisions' ? 'active' : ''"
          :navText="'Divisions'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-ungroup text-primary text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/battery"
          :class="getRoute() === 'battery' ? 'active' : ''"
          :navText="'Battery'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-battery-half text-danger text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/tokens"
          :class="getRoute() === 'tokens' ? 'active' : ''"
          :navText="'Tokens'"
        >
          <template v-slot:icon>
            <i class="ni ni-key-25 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="ms-2"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
  <!--div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
    />
  </div-->
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Building Monitoring",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
