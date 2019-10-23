<template lang="pug">

  .content.settings
    .content__header
      h1.title Settings

    h3.mt-6 Sex:
    
    .radio-button
      input(type="radio" name="sex" v-model="sex" value="male" id="male")
      label(for="male") Male
    .radio-button
      input(type="radio" name="sex" v-model="sex" value="female" id="female")
      label(for="female") Female

    h3.mt-8 Daily water consumption (ml):
    input(type="number" v-model="dailyConsumption").text-input

    h3.mt-8 Default amount of water (ml):
    input(type="number" v-model="defaultWater").text-input

    p.hint.small.mt-6 Options are saved automatically

    

</template>
 
<script>
export default {
  data() {
    return {}
  },
  computed: {
    sex: {
      get() {
        return this.$store.state.progress.sex
      },
      set(value) {
        this.$store.commit('progress/SET_SEX', value)
        this.$store.commit('progress/UPDATE')
      }
    },
    dailyConsumption: {
      get() {
        return this.$store.state.progress.default_incr
      },
      set(value) {
        this.$store.commit('progress/SET_DEFAULT_INCR', value)
        this.$store.commit('progress/UPDATE')
      }
    },
    defaultWater: {
      get() {
        return this.$store.state.progress.target
      },
      set(value) {
        this.$store.commit('progress/SET_TARGET', value)
        this.$store.commit('progress/UPDATE')
      }
    }
  },
  transition(to, from) {
    if (from && from.name == 'info') return 'slide-left'
    return to.name == 'settings' ? 'slide' : 'slide-left'
  },
  components: {}
}
</script>

<style lang="sass" scoped>
@import '@/assets/style/pages/home.sass'
</style>
