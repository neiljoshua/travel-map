<template>
  <div class="login">
    <div class="form-wrapper">
      <h1 class="form-wrapper__title" >Login</h1>
      <form @submit.prevent="login" class="form">
        <input class="form__input" type="text" name="username" v-model="form.username" placeholder="Username" />
        <input class="form__input" type="password" name="password" autocomplete="on" v-model="form.password" placeholder="password" />
        <button class="form__button" type="submit-button">Login</button>
        <p v-if="error" class="error"> {{error.message}} </p>
        <p class="message-caption">Do you need an account? <router-link :to="{name: 'register'}" class="message-link"> Register</router-link></p>
      </form>
    </div>
  </div>
</template>
<script >
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      async login() {
        try{
          // eslint-disable-next-line
          const result = await this.$store.dispatch('login', this.form),
                { redirect = false } = this.$route.query,
                path = redirect ? decodeURI(redirect) : '/member';

          this.$router.push({ path })
        }catch(e){
          console.log("Error:", e)
          localStorage.removeItem('user-token')
          this.error = e
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100vw - 4px);
    height: calc( 100vh - 4px );
  }

  .register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }

  .form-wrapper {
    width: 50%;
    margin: 0 auto;
    &__title{
      display: block;
      text-align: center;
      font-size: 40px;
      color: $bluegray;
    }
  }

  .form {
    margin: 20px;
    &__input {
      display: block;
      color: $gray;
      margin: 30px auto;
      width: calc( 100% - 20px );
      padding: 10px;
      font-size: 21px;
      border: $yellow 2px solid;
      @include media-min-width(tablet) {
        width: 400px;
      }
    }
    &__button {
      display: block;
      margin: 40px auto;
      width: 100%;
      height: 75px;
      font-size: 22px;
      background-color: $yellow;
      color: $bluegray;
      border-radius: 10px;
      @include media-min-width(tablet) {
        width: 250px;
      }
    }
  }

  .error{
    color: red;
    font-size: 18px;
  }

  .message-caption {
    margin: 40px auto;
    color: $darkgray;
    text-align: center;
  }

  .message-link {
    color: $bluegray;
    font-weight: 600;
  }

</style>
