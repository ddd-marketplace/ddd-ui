import create from 'zustand'

const useStore = create((set, get) => {
  return {
    title: '',
    darkMode: false,
    router: {},
    user: null,
    events: null,
    setEvents: (events) => {
      set({ events })
    },
    defaultModels: null,
    currentModels: [],
    parseBuffer: null,
    search: '',
    order: 'alphabetic',
  }
})

export default useStore
