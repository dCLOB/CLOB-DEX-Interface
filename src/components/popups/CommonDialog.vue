<template>
  <v-dialog v-model="activeDialog" persistent>
    <div class="service-message-wrapper primary mainBorderColor">
      <div class="close-dialog" @click="activeDialog = false">
        <img src="../../assets/img/close.svg" alt="close-icon" />
      </div>
      <h2 v-if="title" class="sevice-message-title textMainColor">{{title}}</h2>
      <slot></slot>
      <div v-if="showFooter" class="service-btn-block">
        <button class="service-btn btn-cancel mainBorderColor" @click="activeDialog = false">Cancel</button>
        <button class="service-btn btn-try accent" @click="activeDialog = false">Try Again</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "CommonDialog",
    props: {
        title: {
            type: String
        },
        showFooter: {
            type: Boolean
        }
  },
  
  data() {
    return {
        activeDialog: false,

    };
  },
  methods: {
    openPopups () {
      this.activeDialog = true;
    },
    closePopups () {
      this.activeDialog = false;
    },
  }
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

.service-btn__full {
  width: 100%;
}

.service-btn__outlined {
  position: relative;
  /* border: 1px solid #FFB200; */
}

.service-btn__outlined:before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%);
}

.service-btn__outlined:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border-radius: 8px;
  background: var(--v-primaryBg-base);
}

.service-btn__outlined span {
  position: relative;
  z-index: 2;
  background-image: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%);
  background-clip: text;
  color: #fff;
  transition: .2s all;
 }

.btn-cancel {
  margin: 0 20px 0 0;
}

.btn-try {
  color: #111222;
}
</style>