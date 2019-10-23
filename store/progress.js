import dayjs from 'dayjs'

export const state = () => ({
  target: 2000,
  consumed: 0,
  default_incr: 100,
  percents: 0,
  sex: 'male',
  history: []
})
export const getters = {}
export const mutations = {
  UPDATE(state) {
    state.percents = Math.ceil(100 / (state.target / state.consumed))

    // updating
    localStorage.setItem(
      'options',
      JSON.stringify({
        target: state.target,
        default_incr: state.default_incr,
        sex: state.sex
      })
    )

    // updating history

    let today = dayjs().format('YYYY-MM-DD')
    let note = {
      consumed: state.consumed,
      date: today
    }

    let index = state.history.findIndex((e) => e.date == today)

    if (index != -1) {
      state.history[index] = note
    } else {
      state.history.push(note)
    }

    localStorage.setItem('history', JSON.stringify(state.history))
  },
  SET_DEFAULT_INCR(state, value) {
    state.default_incr = Number(value)
  },
  SET_SEX(state, value) {
    state.sex = value
  },
  SET_TARGET(state, value) {
    state.target = Number(value)
  }
}
export const actions = {
  init({ state, commit }) {
    let options = JSON.parse(localStorage.getItem('options'))
    state.history = JSON.parse(localStorage.getItem('history')) || []

    if (!options) {
      localStorage.setItem('history', JSON.stringify([]))
      return
    }

    state.target = options.target
    state.default_incr = options.default_incr

    let today = dayjs().format('YYYY-MM-DD')
    let index = state.history.findIndex((e) => e.date == today)

    if (index != -1) state.consumed = state.history[index].consumed || 0

    commit('UPDATE')
  },
  refresh({ state, commit }) {
    state.consumed = 0
    commit('UPDATE')
  },
  setWater({ state, commit }, value) {
    state.consumed = value
    commit('UPDATE')
  },
  addWater({ state, commit }) {
    state.consumed = state.consumed + state.default_incr
    commit('UPDATE')
  },
  returnWater({ state, commit }) {
    let result = state.consumed - state.default_incr
    state.consumed = result > 0 ? result : 0
    commit('UPDATE')
  }
}
