<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @keydown.esc="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h3 name="header">{{iot['name']}}</h3>
        </div>

        <div class="modal-body">
          <div class="input-group">
            <iot-values :iot="iot"/>
            <!--iot-historic :iot="iot"/-->
          </div>
        </div>

        <div class="text-center">
          <argon-button class="m-2" variant="gradient" color="success" size="sm" @click="$emit('close')">Ok</argon-button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>

import ArgonButton from "@/components/ArgonButton.vue";
//import IotHistoric from "./IotHistoric.vue";
import IotValues from "./IotValues.vue";

export default {
  name: "iot-modal-dialog",
  props: {
    show: Boolean,
    iot: String,
  },
  components: {
    //IotHistoric,
    IotValues,
    ArgonButton,
  },
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 850px;
  margin: auto;
  padding: 20px 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>