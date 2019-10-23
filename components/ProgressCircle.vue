<template lang="pug">
  .progress-circle
    canvas(ref='progress' height='840' width='840').circle__canvas
    .circle__content(:class="{done: doneMode}")
      .water-left(v-text="doneMode ? 'Well done!' : `${consumed}ml`" :class="{fadeOutTrigger: triggerAnimation}")
      .hint(@click="progress.fill()" v-text="doneMode ? `${target}ml reached!`: `Drunk today`") 
      .target.hint.small(v-text="doneMode ? '' : `Target: ${target}ml`")
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['refresh'],
  data() {
    return {
      progress: {},
      triggerAnimation: false,
      triggerAnimatonTO: {},
      doneMode: false
    }
  },
  watch: {
    refresh() {
      this.progress.clean()
      this.progress.draw(100, '#CEE8FD')
      this.progress.update(this.progressValue)
      this.doneMode = false
    },
    progressValue(newVal) {
      this.progress.update(newVal)
      this.triggerAnimation = true
      this.triggerAnimatonTO = setTimeout(() => {
        this.triggerAnimation = false
      }, 500)

      if (newVal >= 100) this.targetReached()
    }
  },
  computed: {
    ...mapState({
      progressValue: (state) => state.progress.percents,
      target: (state) => state.progress.target,
      consumed: (state) => state.progress.consumed
    })
  },
  methods: {
    targetReached() {
      this.progress.fill()
      this.doneMode = true
      this.$emit('targetReached')
    }
  },
  mounted() {
    let ctx = this.$refs.progress.getContext('2d')

    let gradient = ctx.createLinearGradient(0, 280, 280, 0)
    gradient.addColorStop('0', '#1399EC')
    gradient.addColorStop('1', '#9BE3F7')

    ctx.scale(4.5, 4.5) // Retina displays support

    function Circle(vm) {
      this.progress = 0
      this.fillAlpha = 0
      this.stopDraw = false // used to stop drawing
      /**
       * Очистить поле (по достижении цели)
       */
      this.clean = () => {
        ctx.clearRect(0, 0, 280, 280)
      }
      /**
       * Заполнить градиентом (по достижении цели)
       */
      this.fill = () => {
        if (vm.progressValue < 100) return
        this.clean()
        ctx.beginPath()
        ctx.arc(
          280 / 3,
          280 / 3,
          280 / 3,
          -Math.PI / 2,
          ((Math.PI * 2) / 100) * 100 - Math.PI / 2,
          false
        )
        ctx.fillStyle = gradient
        this.fillAlpha += 0.02
        ctx.globalAlpha = this.fillAlpha
        ctx.lineWidth = '0'
        ctx.lineCap = 'round'
        ctx.fill()

        if (this.fillAlpha < 1) return requestAnimationFrame(this.fill)
      }
      /**
       * Отрисовывает окружность нужной длинны (прогресса)
       */
      this.draw = (progress, color, detect) => {
        if (vm.progressValue >= 100) return

        ctx.beginPath()
        ctx.arc(
          280 / 3,
          280 / 3,
          255 / 3,
          -Math.PI / 2,
          ((Math.PI * 2) / 100) * progress - Math.PI / 2,
          false
        )
        ctx.strokeStyle = color
        ctx.lineWidth = '17.5'
        ctx.lineCap = 'round'
        ctx.stroke()

        if (detect) this.progress = progress
      }
      /**
       * При помощи функции 'draw' анимирует прогресс до нужного значения
       */
      this.update = (progress) => {
        if (progress == 100) return
        let step = () => {
          let diff = progress - this.progress

          if (diff == 0) return

          let newProgress = diff >= 0 ? this.progress + 1 : this.progress - 1
          this.draw(100, '#CEE8FD') // окружность-фон
          this.draw(newProgress, gradient, true) // окружность-прогресс
          requestAnimationFrame(step)
        }
        step()
      }
    }

    this.progress = new Circle(this)
    if (this.progressValue >= 100) return this.targetReached()
    this.progress.draw(100, '#CEE8FD')
    this.progress.update(this.progressValue)
  }
}
</script>