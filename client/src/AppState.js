import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},

  profile: null,
  profiles: [],

  character: null,
  characters: [],

  party: null,
  parties: [],
  filteredParties: [],

  art: null,
  artArray: [],

  story: null,
  stories: [],

  sentPartyInvites: [],
  receivedPartyInvites: [],

  sentJoinRequests: [],
  receivedJoinRequests: []
})
