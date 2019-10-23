<template lang="pug">

  .content.stats
    .content__header
      h1.title Info

    //- h3.mt-6 Last month:

    p.hint.mt-10 The application was created for demonstrative purposes.
    p.hint.mt-2 Not recommended for everyday use.
    p.hint.mt-2 For mobile devices only.
    p.hint.mt-6 Designed and developed by UX/UI Developer Alexander Gusev
    p.hint.mt-2
      <a href="https://gusev.me" target="_blank" class="tdu">Website</a>, 
      <a href="https://vk.com/gusevme" target="_blank" class="tdu">vk.com/gusevme</a>, 
      <a href="mailto:info@gusev.me" target="_blank" class="tdu">info@gusev.me</a>

    p.hint.mt-2 Powered by Vuejs
    
    


        

</template>
 
<script>
export default {
  transition() {
    return 'slide'
  },
  components: {}
}
</script>

<style lang="sass" scoped>
@import '@/assets/style/pages/stats.sass'
</style>
