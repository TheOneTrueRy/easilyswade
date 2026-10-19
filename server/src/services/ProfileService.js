import { dbContext } from '../db/DbContext.js'

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

const PUBLIC_FIELDS = 'name picture description createdAt'

class ProfileService {
  /**
    * Returns a user profile from its id
    * @param {string} id
   */
  async getProfileById(id) {
    // NOTE profiles are public, so only the parts of an account that are meant to be shown (not the email or login ids)
    const profile = await dbContext.Account.findById(id).select(PUBLIC_FIELDS)
    return profile
  }

  /**
    * Returns a list user profiles from a query search of name likeness
    * limits to first 20 without offset
    * @param {string} name
   */
  async findProfiles(name = '') {
    const filter = new RegExp(name, 'ig')
    return await dbContext.Account
      .aggregate([{
        $match: { name: filter }
      }, {
        $project: { name: 1, picture: 1, description: 1, createdAt: 1 }
      }])
      .collation({ locale: 'en_US', strength: 1 })
      // .skip(Number(offset))
      // .limit(20)
      .exec()
  }
}

export const profileService = new ProfileService()
