<template lang="pug">

  .content.home
    .content__header
      h1.title(v-text="currentDate")
      nuxt-link(to="stats").btn.btn--text.btn--x-small.tac Open stats

    client-only
      progress-circle(@targetReached="doneMode = true" :refresh="refreshTrigger")

    client-only
      .actions(:class="{done: doneMode}")
        a(@click="$router.push('/settings')").btn.btn--icon
          img(src='/img/icons/cog.svg')
        a(@click="addWater").btn.btn--icon.btn--icon--large
          img(src='/img/icons/raindrop.svg')
        a(@click="returnWater").btn.btn--icon
          img(src='/img/icons/refresh.svg')
        a(@click="refreshProgress" v-if="showRefresh").btn.btn--icon-text.actions__share
          img(src="/img/icons/refresh-blue.svg")
          span Refresh
  
        

</template>
 
<script>
import ProgressCircle from '@/components/ProgressCircle'
import { mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  head: {
    title: 'Waaater App | Vue.js PWA by Alexander Gusev'
  },
  data() {
    return {
      doneMode: false,
      showRefresh: false,
      refreshTrigger: false
    }
  },
  watch: {
    doneMode(val) {
      setTimeout(() => {
        this.showRefresh = val
      }, 500)
    }
  },
  methods: {
    refreshProgress() {
      this.doneMode = false
      this.showRefresh = false
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
