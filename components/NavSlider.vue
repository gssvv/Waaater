<template lang="pug">
  .nav-slider(ref='navSlider' :style='{ left}')
    span(v-for='(item, index) in menuItems' :key='index' :class='{active: item.active}' v-text='item.text' @click='navigate(null, index)').nav-slider__item.btn.btn--text

</template>

<script>
console.log(process.server)

if (process.client) {
  var Hammer = require('hammerjs')
}

export default {
  data() {
    return {
      menuItems: [
        {
          text: 'My hydration',
          page: 'index',
          active: true
        },
        {
          text: 'Stats',
          page: 'stats',
          active: false
        },
        {
          text: 'Settings',
          page: 'settings',
          active: false
        },
        {
          text: 'Info',
          page: 'info',
          active: false
        }
      ],
      left: 0,
      deltaX: 0
    }
  },
  async mounted() {
    this.initSlider()
    this.calcLeft()
    this.updateSliderRoute(this.$route.name)
  },
  watch: {
    '$route.name'(page) {
      this.updateSliderRoute(page)
    }
  },
  methods: {
    updateSliderRoute(page) {
      let index = this.menuItems.findIndex((e) => e.page == page)
      this.navigate(undefined, index)
    },
    initSlider() {
      let { navSlider } = this.$refs
      let sliderHammer = new Hammer(navSlider)
      sliderHammer.on('panleft panright', (ev) => {
        this.calcLeft(ev.deltaX)
      })
      sliderHammer.on('panend', (ev) => {
        if (ev.deltaX > 50) {
          this.navigate('back')
        } else if (ev.deltaX < -50) {
          this.navigate('forward')
        } else {
          this.calcLeft()
        }
      })
    },
    /**
     * Makes navigation depending on swipe direction or index
     */
    navigate(direction, newIndex) {
      let index = this.menuItems.findIndex((e) => e.active)

      if (direction == 'back') {
        if (index > 0) {
          this.menuItems[index].active = false
          this.menuItems[index - 1].active = true
        }
      }

      if (direction == 'forward') {
        if (index < this.menuItems.length - 1) {
          this.menuItems[index].active = false
          this.menuItems[index + 1].active = true
        }
      }

      if (newIndex != undefined) {
        this.menuItems[index].active = false
        this.menuItems[newIndex].active = true
      }

      this.$router.push({ name: this.menuItems.find((e) => e.active).page })

      setTimeout(() => {
        this.calcLeft()
      }, 10)
    },
    /**
     * Recalculates `left` property of nav-slider to keep
     * active element in the middle
     */
    calcLeft(deltaX = 0) {
      let mltp = deltaX < 0 ? -1 : 1
      deltaX = mltp * deltaX > 120 ? 120 * mltp : deltaX

      let { navSlider } = this.$refs
      let navSliderItems = Array.from(navSlider.children)

      let activeItem = navSliderItems.find((item) => {
        let classList = Array.from(item.classList)
        return classList.includes('active')
      })

      let activeWidth = Math.round(activeItem.offsetWidth || 0)

      this.left =
        window.innerWidth / 2 -
        (activeWidth / 2 + activeItem.offsetLeft - deltaX - 20) +
        'px'
    }
  },
  computed: {}
}
</script>

<style lang="sass" scoped>

.nav-slider
  padding: 15px 0
  margin: 0 -15px
  display: flex
  width: 9999px
  align-items: center
  transition: .25s ease
  position: relative
  white-space: nowrap
  &__item
    text-transform: uppercase
    color: $blue-l-2
    font-size: 1em
    font-weight: 600
    margin: 0 7.5px 
    transition: .25s ease
    &.active
      color: $blue-d-2

@include respond-to-v(i8)
  .nav-slider
    &__item
      font-size: 1.125em

@include respond-to-v(i8p)
  .nav-slider
    padding: 30px 0

</style>