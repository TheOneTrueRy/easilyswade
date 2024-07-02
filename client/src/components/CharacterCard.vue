<template>
  <div class="character-card align-items-end"
    :style="character.thumbnail ? { backgroundImage: `url(${character.thumbnail})` } : { backgroundImage: `url(${character.picture})` }"
    :class="character.privacy == 'Deactivated' ? 'grayscale' : ''">
    <div v-if="character.creatorId == user.id" class="w-100 mb-auto">
      <div class="d-flex justify-content-between pt-1 px-1">
        <button type="button" class="btn character-btn selectable"
          :class="theme == 'light' ? 'btn-dark border border-light' : 'btn-light border border-dark'"
          data-bs-toggle="modal" data-bs-target="#editCharacterThumbnailModal" @click="setCharacter(character)">
          <i class="mdi mdi-image-edit"></i>
        </button>
        <button type="button" class="btn btn-danger character-btn selectable border border-dark"
          @click="deleteOrDeactivateCharacter(character)">
          <i class="mdi mdi-trash-can"></i>
        </button>
      </div>
    </div>
    <div class="w-100 mt-auto">
      <div class="d-flex pb-1 px-1"
        :class="character.privacy == 'Public' ? 'justify-content-between' : 'justify-content-start'">
        <router-link :to="{ name: 'CharacterPage', params: { characterId: character?.id } }"
          :title="`Visit ${character?.name}'s Character Page!`">
          <button class="btn selectable px-2 py-0 character-btn"
            :class="theme == 'light' ? 'btn-dark border border-light' : 'btn-light border border-dark'">Page</button>
        </router-link>
        <router-link v-if="character.privacy == 'Public' || user.id == character.creatorId"
          :to="{ name: 'CharacterSheet', params: { characterId: character?.id } }"
          :title="`Visit ${character?.name}'s Character Sheet!`">
          <button class="btn selectable px-2 py-0 character-btn"
            :class="theme == 'light' ? 'btn-dark border border-light' : 'btn-light border border-dark'">Sheet</button>
        </router-link>
      </div>
    </div>
    <div class="w-100 bg-blur bottom-corners-rounded text-center ellipsis px-2">
      <span class="fs-5 text-light">
        {{ character.name }}
      </span>
    </div>
  </div>

  <!-- SECTION Edit Character Thumbnail Modal -->
  <Modal id="editCharacterThumbnailModal">
    <form @submit.prevent="changeCharacterThumbnail" class="container-fluid">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <span class="fs-4">
            Change Your Character's Thumbnail!
          </span>
          <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-4"></i>
          </button>
        </div>
        <span class="fs-small opacity-75">
          This will be the image shown on the character's card on your profile page.
        </span>
        <div class="col-12 mt-2">
          <input type="file" id="thumbnail" name="fileInput" accept="image/*" class="form-control" required>
        </div>
        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn" data-bs-dismiss="modal"
            :class="theme == 'light' ? 'btn-dark' : 'btn-light'">
            Confirm New Thumbnail
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>


<script>
import { computed } from "vue";
import { Character } from "../models/Character.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import Modal from "../components/Modal.vue";
import { charactersService } from "../services/CharactersService.js";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  props: {
    character: {
      type: Character,
      required: true
    }
  },
  setup() {
    return {
      theme: computed(() => AppState.theme),
      user: computed(() => AppState.user),
      setCharacter(character) {
        try {
          AppState.character = character
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async changeCharacterThumbnail() {
        try {
          let characterId = AppState.character.id
          // @ts-ignore
          const thumbnail = event.target.fileInput.files[0]
          if (!thumbnail) {
            throw new Error('This form has no image uploaded into it!')
          }
          await charactersService.updateCharacterThumbnail(thumbnail, characterId);
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteOrDeactivateCharacter(character) {
        try {
          if (character.deactivated) {
            Swal.fire({
              title: `Do you wish to delete or reactivate the character, ${character.name}?`,
              html: "Deleting will fully erase this character from the site and database, irreversibly.<br>Reactivating will make it so that the character's page and sheet will no longer only be accessible/viewed through direct links. This can be toggled on/off at any time.",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "DELETE",
              denyButtonText: `REACTIVATE`,
              confirmButtonColor: "#971515",
              denyButtonColor: "#0D5D2D"
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                try {
                  await charactersService.deleteCharacter(character.id)
                  Pop.success('Character successfully deleted.')
                } catch (error) {
                  Pop.error('Something went wrong when attempting to delete this character. Oh no!')
                }
              } else if (result.isDenied) {
                try {
                  await charactersService.toggleDeactivateCharacter(character.id)
                  Pop.success('Character successfully reactivated!')
                } catch (error) {
                  Pop.error('Something went wrong when attempting to reactivate this character! Oh no!')
                }
              }
            });
          } else {
            Swal.fire({
              title: `Do you wish to delete or deactivate the character, ${character.name}?`,
              html: "Deleting will fully erase this character from the site and database, irreversibly.<br>Deactivating will make it so that the character's page and sheet will only be accessible/viewed through direct links. This can be toggled on/off at any time.",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "DELETE",
              denyButtonText: `DEACTIVATE`,
              confirmButtonColor: "#971515",
              denyButtonColor: "#000000"
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                try {
                  await charactersService.deleteCharacter(character.id)
                  Pop.success('Character successfully deleted.')
                } catch (error) {
                  Pop.error('Something went wrong when attempting to delete this character. Oh no!')
                }
              } else if (result.isDenied) {
                try {
                  await charactersService.toggleDeactivateCharacter(character.id)
                  Pop.success('Character successfully deactivated.')
                } catch (error) {
                  Pop.error('Something went wrong when attempting to deactivate this character. Oh no!')
                }
              }
            });
          }
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  },

  components: { Modal }
}
</script>


<style lang="scss" scoped>
.character-card {
  height: 20vh;
  width: 26vh;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
}

.bg-blur {
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.400);
}

.bottom-corners-rounded {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

.character-btn {
  display: none;
}

.character-card:hover {
  .character-btn {
    display: block;
  }
}

.fs-small {
  font-size: small
}

.grayscale {
  filter: grayscale(1);
}

@media screen and (max-width: 576px) {
  .character-card {
    width: 40vh;
    max-width: 100%;
  }
}
</style>