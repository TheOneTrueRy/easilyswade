<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0 bg-dark border-0 selectable text-end no-select rounded" type="button"
        data-bs-toggle="dropdown" aria-expanded="false">
        <div v-if="account.picture">
          <img :src="account.picture" alt="account photo" height="50" class="rounded" title="Open Profile Controls" />
        </div>
      </div>
      <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
        <div class="list-group">
          <router-link :to="{ name: 'Profile', params: { profileId: account?.id || user?.id } }">
            <div class="list-group-item dropdown-item list-group-item-action rounded-top"
              title="Visit your Profile Page">
              My Profile
            </div>
          </router-link>
          <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
            <i class="mdi mdi-logout"></i>
            Log Out
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
