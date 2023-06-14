<template>
  <button class="buttonVue" @click="onClick">{{ text }}</button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: {
      type: String,
    },
  },
  methods: {
    onClick() {
      console.log(this.text);
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/style.scss";
</style>
