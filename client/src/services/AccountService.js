import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Profile } from "../models/Profile.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { supabaseService } from "./SupabaseService.js"

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(file, formData) {
    const folder = AppState.user.id
    if (file) {
      const url = await supabaseService.upload(file, `${folder}/profilepictures/${new Date().toISOString()}`)
      formData.picture = url
    }
    const res = await api.put('account', formData)
    AppState.account = new Account(res.data)
    AppState.profile = new Profile(res.data)
  }
}

export const accountService = new AccountService()
