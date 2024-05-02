<template>
  <a class="link" :href="url" target="_blank">
    <i class="avatar" :class="className">&nbsp;</i>
    {{ title }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['title', 'url', 'className'],
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import url('https://use.fontawesome.com/releases/v6.5.2/css/all.css');

$accentColor: #fff;
$bgColor: #223344;

.link {
  position: relative;
  background-color: transparent;
  color: $accentColor;
  border: solid $accentColor 2px;
  border-radius: 10px;
  text-align: center;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px; /* 17px */
  text-decoration: none;
  /* transition: all .25s cubic-bezier(.08, .59, .29, .99); */
  -webkit-tap-highlight-color: transparent;

  .avatar {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
}

@media (hover: hover) {
  .link:hover {
    background-color: $accentColor;
    color: $bgColor;
  }
}

.link:active {
  background-color: $accentColor;
  color: $bgColor;
}
</style>
