<template>
  <nav class="navbar bg-light w-100 navbar-expand-lg px-3">
    <router-link class="navbar-brand d-flex text-black" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img
          alt="logo text-border"
          src="../../assets/img/plan-it-logo.png"
          height="45"
        />
        <p class="m-0 ps-3 fs-2 text-primary text-border">PlanIt</p>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="pe-3" v-if="user.isAuthenticated">
        <p class="m-0 text-primary fs-5">{{ account.name }}</p>
        <p class="m-0">{{ account.title }}</p>
      </div>
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import Login from "./Login.vue";
import { AppState } from "../../AppState.js";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
    };
  },
  components: { Login },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
