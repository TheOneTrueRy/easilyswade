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
  receivedJoinRequests: [],

  theme: null,

  // NOTE the dice tray holds the roll being built and lastRoll is the one the user just made
  diceTray: { open: false, pool: [], modifier: 0, ace: false, rolling: false },
  lastRoll: null,

  // NOTE the chatroom of the party that the character sheet being viewed is in, only filled while on that sheet
  partyChat: { characterId: null, partyId: null, partyName: '', messages: [], unread: 0, open: false, joined: false }
})
