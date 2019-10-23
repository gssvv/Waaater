<template lang="pug">
  .layout.default
    .container.desktop 
      .content.desktop
        h1 
          img(src="/img/icons/water-glass.svg" width="80").mr-2
          span Waaater
        h3 Mobile-oriented PWA app powered by Vue.js
        
        h2.mt-16 If you want to try it, open this website on <b>mobile device</b>. On Android, you can also download it in Chrome browser ("Add to Home screen" function) and use offline (PWA). Or just open this site in a smaller window and reload the page.
          
        h2.mt-10 Чтобы воспользоваться приложением, откройте его на <b>мобильном устройстве</b>. На Android устройствах в бразуере Chrome его также можно добавить на телефон (функция "Добавить на главный экран") и использовать оффлайн (PWA). Или же просто откройте сайт в более маленьком окне и перезагрузите страницу.

        h2.mt-16 Designed and developed by UX/UI Developer <b>Alexander Gusev</b>
        h2: a(href="https://gusev.me/" target="blank" class="tdu") gusev.me
        h2: a(href="mailto:info@gusev.me" target="blank" class="tdu") info@gusev.me
        h2: a(href="https://vk.com/gusevme" target="blank" class="tdu") vk.com/gusevme

    .container.mobile
      nuxt

    client-only
      nav-slider

</template>

<script>
import NavSlider from '@/components/NavSlider.vue'

export default {
  beforeMount() {
    this.$store.dispatch('progress/init')
  },
  components: { NavSlider }
}
</script>

<style lang="sass">
@import '@/assets/style/default.sass'

.content.desktop
  h1 
    text-transform: uppercase
    font-size: 112px
    letter-spacing: 0.75px
    background: $gradient
    font-weight: bold
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    margin: 0 0 0 -16px
  h3
    color: $blue-d-1
    font-size: 18px
    font-weight: 400
  h2
    color: $blue-d-3
    font-size: 18px
    font-weight: 400
    line-height: 1.6
</style>