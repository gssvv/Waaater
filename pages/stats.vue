<template lang="pug">

  .content.stats
    .content__header
      h1.title Statistics

    //- h3.mt-6 Last month:

    .content__facts

      .fact__item
        .fact__icon: img(src="/img/icons/reboot-gradient.svg")
        .fact__title(v-text="`${totalDays} ${totalDays > 1 ? 'days' : 'day'}`")
        .fact__desc Tracked so far
      .fact__item
        .fact__icon: img(src="/img/icons/water-glass.svg")
        .fact__title(v-text="`${avarage}ml`")
        .fact__desc Your avarage daily water consumption
      .fact__item
        .fact__icon: img(src="/img/icons/water-glasses.svg")
        .fact__title(v-text="`${totalWater}ml`")
        .fact__desc You've drunk in total

    
    


        

</template>
 
<script>
import dayjs from 'dayjs'

export default {
  computed: {
    totalDays() {
      let history = this.$store.state.progress.history
      let firstDay = history.map((e) => e.date)[0]
      return dayjs().diff(firstDay, 'day') + 1
    },
    avarage() {
      return this.totalWater / this.totalDays
    },
    totalWater() {
      let history = this.$store.state.progress.history
      return history.reduce((acc, val) => {
        return acc + val.consumed
      }, 0)
    }
  },
  transition(to, from) {
    if (!from) return 'slide'
    return from.name == 'index' ? 'slide' : 'slide-left'
  },
  components: {}
}
</script>

<style lang="sass" scoped>
@import '@/assets/style/pages/stats.sass'
</style>
