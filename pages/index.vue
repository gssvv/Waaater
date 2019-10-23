<template lang="pug">

  .content.home
    .content__header
      h1.title(v-text="currentDate")
      nuxt-link(to="stats").btn.btn--text.btn--x-small.tac Open stats

    progress-circle(@targetReached="doneMode = true" :refresh="refreshTrigger")

    .actions(:class="{done: doneMode}")
      a(@click="$router.push('/settings')").btn.btn--icon
        img(src='/img/icons/cog.svg')
      a(@click="addWater").btn.btn--icon.btn--icon--large
        img(src='/img/icons/raindrop.svg')
      a(@click="returnWater").btn.btn--icon
        img(src='/img/icons/refresh.svg')
      a(@click="refreshProgress").btn.btn--icon-text.actions__share
        img(src="/img/icons/refresh-blue.svg")
        span Refresh
  
        

</template>
 
<script>
import ProgressCircle from '@/components/ProgressCircle'
import { mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      doneMode: false,
      refreshTrigger: false
    }
  },
  methods: {
    refreshProgress() {
      this.doneMode = false
      this.refreshTrigger = !this.refreshTrigger
      this.refresh()
    },
    ...mapActions({
      addWater: 'progress/addWater',
      returnWater: 'progress/returnWater',
      refresh: 'progress/refresh'
    })
  },
  computed: {
    currentDate() {
      return dayjs().format('MMMM D')
    },
    ...mapState({
      consumed: (state) => state.progress.consumed
    })
  },
  transition(to) {
    return to.name == 'index' ? 'slide-left' : 'slide'
  },
  components: { ProgressCircle }
}
</script>

<style lang="sass">
@import '@/assets/style/pages/home.sass'
</style>
