<template>
  <div class="detailContainer">
    <Navbar />
    <div class="detailCard">
      <div class="detailCardWrapper">
        <img :src="thumbnailUrl" alt="hero" class="detailCardImg" />
        <div class="detailCardInfo">
          <h1 class="detailCardTitle">{{ hero.title }}</h1>
          <p class="detailCardDescription">
            {{
              hero.description == ""
                ? "Description not yet entered"
                : hero.description
            }}
          </p>
        </div>
      </div>
      <div class="detailCardButtons">
        <p><b>Format:</b> {{ hero.format }}</p>
        <p><b>Page Count:</b> {{ hero.pageCount }}</p>
        <p><b>Price:</b> {{ getPrice() }}</p>
        <p><b>Creators:</b> {{ getCreator() }}</p>
        <p><b>Published:</b> {{ getDate() }}</p>
        <p class="cardLinkHead">
          More info:
          <a :href="getURL()" target="_blank" class="cardLink">Click Here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "ComicDetailView",
  components: {
    Navbar,
  },
  data() {
    return {
      hero: {},
      standarSizes: "portrait_incredible.jpg",
    };
  },
  mounted() {
    this.getCharacter();
  },
  computed: {
    thumbnailUrl() {
      if (this.hero.thumbnail) {
        return `${this.hero.thumbnail.path}/${this.standarSizes}`;
      }
      return "";
    },
  },
  methods: {
    getCharacter() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics/${
            this.$route.params.id
          }?ts=1&apikey=${
            import.meta.env.VITE_PUBLIC_KEY
          }&hash=48c435789acfc545957422b6da00ae9d`
        )
        .then((response) => {
          this.hero = response.data.data.results[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPrice() {
      if (this.hero.prices && this.hero.prices.length > 0) {
        return this.hero.prices[0].price;
      }
      return "";
    },
    getCreator() {
      if (this.hero.creators && this.hero.creators.items.length > 0) {
        return this.hero.creators.items[0].name;
      }
      return "";
    },
    getDate() {
      if (this.hero.dates && this.hero.dates.length > 0) {
        return this.hero.dates[0].date;
      }
      return "";
    },
    getURL() {
      if (this.hero.urls && this.hero.urls.length > 0) {
        return this.hero.urls[0].url;
      }
      return "";
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/detailStyle.scss";
</style>
