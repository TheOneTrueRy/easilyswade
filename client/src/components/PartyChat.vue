<template>
  <!-- SECTION Chat Button, always on screen while on the sheet -->
  <button type="button" class="chat-fab btn shadow" :class="[theme == 'light' ? 'btn-dark' : 'btn-light', { 'tray-open': trayOpen }]"
    data-bs-toggle="offcanvas" data-bs-target="#partyChat" aria-controls="partyChat" title="Open your party's chatroom.">
    <i class="mdi mdi-chat fs-3"></i>
    <span v-if="chat.unread" class="badge rounded-pill bg-danger unread-badge">{{ chat.unread > 99 ? '99+' : chat.unread }}</span>
  </button>

  <!-- SECTION Chatroom, the messages and dice rolls of the whole party -->
  <div ref="panelElement" class="offcanvas offcanvas-end party-chat" tabindex="-1" id="partyChat"
    aria-labelledby="partyChatLabel">
    <div class="offcanvas-header border-bottom">
      <div class="overflow-hidden">
        <h5 class="offcanvas-title fw-bold clip-text" id="partyChatLabel">
          <i class="mdi mdi-chat"></i> {{ chat.partyName || 'Party Chat' }}
        </h5>
        <div class="fs-small opacity-75">
          {{ chat.noParty ? "This character isn't in a party yet." : chat.joined ? 'Only the members of this party can see this chat.' : 'Connecting...' }}
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div ref="feedElement" class="feed">
      <i v-if="chat.noParty" class="d-block text-center py-4">
        Once this character is in a party, you'll be able to chat with the rest of the party here, and everyone's dice
        rolls will be logged.
      </i>
      <i v-else-if="chat.joined && !chat.messages.length" class="d-block text-center py-4">
        Nothing here yet, say hello or roll some dice!
      </i>
      <div v-for="m in chat.messages" :key="m.id" class="entry" :class="{ mine: isMine(m), roll: m.roll }">
        <div class="entry-header">
          <b>{{ m.characterName }}</b>
          <span class="opacity-75">{{ formatTime(m.createdAt) }}</span>
        </div>
        <div v-if="!m.roll" class="text-break">{{ m.text }}</div>
        <div v-else>
          <div class="d-flex align-items-baseline justify-content-between">
            <span><i class="mdi mdi-dice-multiple accent"></i> rolled {{ m.roll.description }}</span>
            <span class="roll-total">{{ m.roll.total }}</span>
          </div>
          <div v-for="(d, index) in m.roll.dice" :key="index" class="fs-small opacity-75">
            {{ dieName(d) }}: {{ d.rolls.join(' + ') }}<span v-if="d.bonus"> {{ d.bonus > 0 ? '+' : '-' }} {{
              Math.abs(d.bonus) }}</span> = {{ d.total }}
          </div>
          <div v-if="m.roll.modifier" class="fs-small opacity-75">
            Modifier: {{ m.roll.modifier > 0 ? '+' : '' }}{{ m.roll.modifier }}
          </div>
        </div>
      </div>
    </div>

    <form class="d-flex gap-2 p-2 border-top" @submit.prevent="sendMessage">
      <input v-model="text" type="text" maxlength="500" class="form-control" placeholder="Message your party..."
        aria-label="Message your party" :disabled="!chat.joined" autocomplete="off">
      <button type="submit" class="btn btn-danger" :disabled="!chat.joined || !text.trim()" title="Send">
        <i class="mdi mdi-send"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import { dieName } from "../models/DiceRoll.js";
import { partyChatService } from "../services/PartyChatService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    characterId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const panelElement = ref(null)
    const feedElement = ref(null)
    const text = ref('')
    const chat = computed(() => AppState.partyChat)

    function scrollToNewest() {
      nextTick(() => {
        if (feedElement.value) {
          feedElement.value.scrollTop = feedElement.value.scrollHeight
        }
      })
    }

    function onShown() {
      partyChatService.setOpen(true)
      scrollToNewest()
    }

    function onHidden() {
      partyChatService.setOpen(false)
    }

    // NOTE being on the sheet is what puts the user in their party's chat (if the server finds the character in a party), leaving it takes them out
    onMounted(() => {
      partyChatService.joinParty(props.characterId)
      panelElement.value.addEventListener('shown.bs.offcanvas', onShown)
      panelElement.value.addEventListener('hidden.bs.offcanvas', onHidden)
    })

    onBeforeUnmount(() => {
      partyChatService.leaveParty()
    })

    watch(() => chat.value.messages.length, () => {
      if (chat.value.open) {
        scrollToNewest()
      }
    })

    return {
      panelElement,
      feedElement,
      text,
      chat,
      dieName,
      theme: computed(() => AppState.theme),
      trayOpen: computed(() => AppState.diceTray.open),
      isMine(message) {
        return message.characterId == props.characterId
      },
      // NOTE just the time for today's messages, the date too for older ones
      formatTime(date) {
        const isToday = date.toDateString() == new Date().toDateString()
        return isToday
          ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
          : date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
      },
      sendMessage() {
        try {
          partyChatService.sendMessage(text.value)
          text.value = ''
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
* {
  font-family: 'Times New Roman', Times, serif;
}

.chat-fab {
  --chat-bottom: 84px;
  align-items: center;
  border-radius: 50%;
  bottom: var(--chat-bottom);
  display: flex;
  // NOTE same layer as the other floating buttons, under offcanvases and modals
  z-index: 1030;
  height: 56px;
  justify-content: center;
  left: 16px;
  padding: 0;
  position: fixed;
  width: 56px;

  // NOTE rides above the dice tray while it's open
  &.tray-open {
    --chat-bottom: calc(var(--dice-tray-height, 0px) + 28px);
  }

  .unread-badge {
    position: absolute;
    right: -4px;
    top: -4px;
  }
}

.party-chat {
  width: 420px;
  max-width: 100%;
}

.feed {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.fs-small {
  font-size: small;
}

.clip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.accent {
  color: var(--bs-danger);
}

[data-bs-theme="dark"] .accent {
  color: #ff5c5c;
}

.entry {
  background-color: var(--bs-tertiary-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  max-width: 90%;
  padding: 0.4rem 0.6rem;

  .entry-header {
    display: flex;
    font-size: small;
    gap: 0.5rem;
    justify-content: space-between;
  }

  // NOTE your own entries sit on the right
  &.mine {
    border-color: var(--bs-danger);
    margin-left: auto;
  }

  &.roll {
    max-width: 100%;
  }

  .roll-total {
    color: var(--bs-danger);
    font-size: 1.75rem;
    font-weight: bold;
    line-height: 1;
  }
}

[data-bs-theme="dark"] .entry .roll-total {
  color: #ff5c5c;
}

@media screen and (max-width: 991.98px) {
  .party-chat {
    width: 100%;
  }
}
</style>
