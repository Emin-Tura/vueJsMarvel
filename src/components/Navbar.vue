<template>
  <div class="navbar" :style="navbarStyle">
    <div class="navbarLeft">
      <router-link to="/" class="navbar__logo">
        <img
          class="navbarLogo"
          src="../assets/img/marvel-logo.png"
          alt="logo"
        />
      </router-link>
    </div>
    <div class="navbarRight">
      <img
        v-if="totalLikes > 0"
        class="navbarFavIcon"
        src="../assets/img/favicon1.png"
        alt="icon"
      />
      <img
        v-else
        class="navbarFavIcon"
        src="../assets/img/favicon.png"
        alt="icon"
      />
      <span class="navbarFavCount">{{ totalLikes }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Navbar",
  data() {
    return {
      navbarStyle: {
        backgroundColor: "transparent",
      },
    };
  },
  computed: {
    totalLikes() {
      return this.$store.state.totalLikes;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = document.querySelector(".navbar") as HTMLElement | null;
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const opacity = Math.min(scrollPosition / navbarHeight, 1);
        this.navbarStyle.backgroundColor = `rgba(236, 29, 36, ${opacity})`;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/style.scss";
</style>
