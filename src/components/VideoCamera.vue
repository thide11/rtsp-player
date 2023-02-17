<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ chanelId: string }>()

const count = ref(0)


function init() {
  
}
init();
</script> -->
<script lang="ts">
import HtmlPlayer from '../HtmlPlayer';
export default {
  mounted() {
    //@ts-ignore
    console.log(this.$refs.video);

    const htmlPlayer = new HtmlPlayer(this.$props.chanelId, this.$refs.video as any);
  },
  props: {
    "chanelId": null,
  }
}
</script>

<template>
    <video id="videoElement" ref="video" autoplay muted playsinline></video>
</template>

<style scoped>
  video {
    width: 100%;
    /* height: 100%; */
  }
</style>
