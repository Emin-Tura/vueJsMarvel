<template>
  <div>
    <div class="mainContainer">
      <Navbar />
      <div class="leftContainer">
        <h1 class="mainTitle">Marvel Movies</h1>
        <div>
          <Button text="Watch Now" />
          <Button text="My List" />
        </div>
        <p class="mainDescription">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ea
          autem atque corporis iste magni saepe quos, eveniet et reprehenderit
          odit facere blanditiis quae est libero earum enim expedita non.
        </p>
      </div>
    </div>
    <div class="movieContainer">
      <div class="topMovies">
        <h2 class="topTitle">Marvel Heros</h2>
        <div class="herosArea">
          <div
            v-for="hero in heros"
            :key="hero.id"
            class="topMoviesCard"
            :style="{
              'background-image':
                'url(' + hero.thumbnail.path + '/portrait_incredible.jpg)',
              'background-size': 'cover',
              'background-repeat': 'no-repeat',
              'background-position': 'center center',
            }"
          >
            <div class="cardCreator">
              {{
                hero.creators.items.length > 0
                  ? hero.creators.items[0].name
                  : "Creator not yet entered"
              }}
            </div>
            <div class="cardContent" @click="routerHref(hero)">
              <h3 class="cardTitle">{{ hero.title }}</h3>
              <p class="cardDescription">
                {{
                  hero.description == ""
                    ? "Description not yet entered"
                    : hero.description
                }}
              </p>
              <img class="arrowIcon" src="../assets/img/arrow.png" alt="icon" />
            </div>

            <img
              v-if="hero.isLiked"
              class="cardFavIcon"
              src="../assets/img/favicon1.png"
              alt="icon"
              @click="toggleLike(hero)"
            />
            <img
              v-else
              class="cardFavIcon"
              src="../assets/img/favicon.png"
              alt="icon"
              @click="toggleLike(hero)"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Navbar from "../components/Navbar.vue";
import Button from "../components/Button.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "MainView",
  components: {
    Navbar,
    Button,
    Footer,
  },
  data: () => ({
    heros: [] as any[],
    likedHeros: {} as Record<number, boolean>,
    standarSizes: "standard_large.jpg",
    totalLikes: 0,
  }),

  mounted() {
    this.getHeros();
    window.addEventListener("scroll", this.parallaxBackground);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.parallaxBackground);
  },

  methods: {
    getHeros() {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=${
            import.meta.env.VITE_PUBLIC_KEY
          }&hash=48c435789acfc545957422b6da00ae9d`
        )

        .then((response) => {
          this.heros = response.data.data.results;
          this.heros.forEach((hero) => {
            this.$set(
              this.likedHeros as Record<number, boolean>,
              hero.id,
              false
            );
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    parallaxBackground() {
      const container = document.querySelector(
        ".mainContainer"
      ) as HTMLElement | null;
      if (container) {
        const scrollPosition = window.pageYOffset;
        container.style.backgroundPositionY = scrollPosition * 0.7 + "px";
      }
    },
    toggleLike(hero) {
      hero.isLiked = !hero.isLiked;
      if (hero.isLiked) {
        this.$store.commit("incrementLikeCount");
      } else {
        this.$store.commit("decrementLikeCount");
      }
    },
    routerHref(val: any) {
      this.$router.push({
        path: "/comics/" + val.id,
      });
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/style.scss";
</style>
