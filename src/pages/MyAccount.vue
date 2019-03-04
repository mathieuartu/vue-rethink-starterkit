<template>
  <div class="account">
    <h2>Mon compte</h2>
    <form class="form update-password" @submit.prevent="updatePassword">
      <h3>Changer mon mot de passe</h3>
      <div class="line">
        <label>Ancien mot de passe</label>
        <input type="password" v-model="oldPassword" required>
      </div>
      <div class="line">
        <label>Nouveau mot de passe</label>
        <input type="password" v-model="newPassword" required>
      </div>
      <div class="line">
        <label>Confirmer le nouveau mot de passe</label>
        <input type="password" v-model="newPasswordConfirmation" required>
      </div>
      <button>Changer mon mot de passe</button>
    </form>

    <div class="error" v-if="errorMessage">{{errorMessage}}</div>

    <form class="form delete-account" @submit.prevent="deleteAccount">
      <h3>Supprimer mon compte</h3>
      <button>Supprimer</button>
    </form>
  </div>
</template>


<script>
import { errorMessages } from "@/tools/errorMessages"

export default {
  data() {
    return {
      newPassword: null,
      newPasswordConfirmation: null,
      oldPassword: null,
      errorMessage: null,
      successMessage: null,
    }
  },
  methods: {
    async updatePassword() {
      if(this.newPassword !== this.newPasswordConfirmation) {
        this.errorMessage = errorMessages['password_confirmation_not_same']
        return false
      }

      try {
        await this.$store.dispatch('updateUserPassword', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
      } catch(error) {
        return this.errorMessage = errorMessages[error.content]
      }   

      this.errorMessage = null

    }
  }
}
</script>

<style lang="scss">
.account {
  .form {
    margin: 20px 0;

    h3 {
      font-weight: bold;
    }
  }
  .error {
    color: red;
  }
}
</style>
