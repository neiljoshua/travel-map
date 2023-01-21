<template>
  <div class="register">
    <div class="form-wrapper">
      <h1 class="form-wrapper__title" >Register</h1>
      <form @submit.prevent="pressed" class="form">
        <input class="form__input" type="text" name="email" v-model="email" placeholder="Email" />
        <input class="form__input" type="password" name="password" v-model="password" placeholder="password" />
        <button class="form__button" type="submit-button">Register</button>
      </form>
      <p v-if="error" class="error"> {{error.message}} </p>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      // async pressed() {
      //   try{
      //     const user = firebase
      // .auth()
      // .createUserWithEmailAndPassword(this.email, this.password)
      //     console.log('user',user)
      //     this.$router.replace({name:'member'})
      //   }catch(err){
      //     console.log(err)
      //   }
      // }
    }
  }

</script>

<style lang="scss" scoped>

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
      margin: 20px auto;
      font-size: 28px;
      color: $bluegray;
    }
  }

  .form {
    margin: 20px;
    &__input {
      display: block;
      margin: 20px auto;
      width: 400px;
      padding: 30px;
      font-size: 21px;
      border: $yellow 2px solid;
    }
    &__button {
      display: block;
      margin: 20px auto;
      width: 250px;
      height: 75px;
      font-size: 22px;
      background-color: $yellow;
      color: $bluegray;
      border-radius: 10px;
    }
  }

  .error{
    color: red;
    font-size: 18px;
  }

</style>

