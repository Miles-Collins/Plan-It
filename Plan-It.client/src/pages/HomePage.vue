<template>
  <button
    class="btn btn-primary fs-2 mt-5"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasProjects"
    aria-controls="offcanvasProjects"
  >
    P
  </button>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
