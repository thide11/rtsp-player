<script lang="ts">
import { ref, toRefs } from 'vue'
// import InfoCard from './components/InfoCard.vue';
// import VideoCamera from './components/VideoCamera.vue';
export default {
  mounted() {
    console.log(this.$refs.videoGrid);
    function resizeVideo() {
      //@ts-ignore
      // this.$refs.videoGrid.style.width = window.innerWidth + "px";
      //@ts-ignore
      this.$refs.videoGrid.style.height = window.innerHeight + "px";
    }

    window.addEventListener('resize', resizeVideo.bind(this), false);
    resizeVideo.bind(this)();
  },
}

</script>

<script setup lang="ts">
  import InfoCard from './components/InfoCard.vue';
  import VideoCamera from './components/VideoCamera.vue';

</script>

<template>
  <!-- <img src="loader.gif" id="loader" v-if="showLoader"/> -->
  <div id="video-grid" ref="videoGrid">
    <!-- <video id="videoElement" style="display: none;" autoplay muted playsinline></video> -->
    <div class="card" style="height: 100%;">
      <!-- <p id="status"></p>
      <select id="cameraSelector">
        <option value="" selected="true">Selecione a camera...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button id="exibirVideo">Exibir video</button> -->
      <InfoCard/>
    </div>
    <div class="card">
      <VideoCamera chanel-id="2"/>
    </div>
    <div class="card">
      <VideoCamera chanel-id="3"/>
    </div>
    <div class="card">
      <VideoCamera chanel-id="4"/>
    </div>
  </div>
</template>

<style scoped>
.card {
  /* width: 50%; */
  height: 50%;
}
#video-grid {
  display:grid;
  grid-template-columns: 704px 704px;
  /* flex-wrap: wrap; */
  /* height: 100vh; */
}

@media screen and (max-width: 1408px) {

  #video-grid {
    display:grid;
    grid-template-columns: 1fr 1fr;
  }

}
@media screen and (max-width: 704px) {

  #video-grid {
    display:grid;
    grid-template-columns: 1fr;
  }

}
</style>
