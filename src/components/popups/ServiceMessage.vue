<template>
  <v-dialog v-model="message" persistent>
    <div class="service-message-wrapper primary mainBorderColor">
      <div class="close-dialog" @click="message = false">
        <img src="../../assets/img/close.svg" alt="close-icon" />
      </div>
      <h2 class="sevice-message-title textMainColor">{{ messageTitle }}</h2>
      <p class="sevice-message-description textSecondaryColor">{{ messageText }}</p>
      <div class="service-btn-block">
        <button class="service-btn btn-cancel mainBorderColor" @click="message = false">Cancel</button>
        <button class="service-btn btn-try accent" @click="message = false">Try Again</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "ServiceMessage",
  data() {
    return {
      message: true,
      messageTitle: "Wrong Connection",
      messageText:
        "Access to the wallet was rejected. The connection couldn't be established.",
    };
  },
};
</script>

<style>
.v-dialog {
  box-shadow: none;
  margin: 0;
  border-radius: 0;
  max-width: 440px;
}

.service-message-wrapper {
  padding: 20px 50px 24px 50px;
  border-radius: 8px;
  border: 1px solid;
  position: relative;
}

.close-dialog {
  width: 12px;
  position: absolute;
  top: 25px;
  right: 23px;
  cursor: pointer;
}

.close-dialog img {
  display: block;
  width: 100%;
}

.sevice-message-title {
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  margin: 0;
}
.sevice-message-description {
  margin: 16px 0 0 0!important;
  text-align: center;
  font-size: 14px;
  line-height: 150%;
}
.service-btn-block {
  margin: 24px 0 0 0;
  display: flex;
  justify-content: center;
}
.service-btn {
  min-width: 120px;
  min-height: 48px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  transition: .5s all;
}

.btn-cancel {
  margin: 0 20px 0 0;
}

.btn-try {
  color: #111222;
}
</style>