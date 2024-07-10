<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @keydown.esc="close()">
      <div class="modal-container">
        <div class="modal-header ">
          <div class="d-flex justify-content-between w-100">
            <h3 name="header">Create New Division</h3>
            <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true" aria-expanded="false"
              @click="close()">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div class="modal-body">
          <div>
            <div class="row">
              <div class="pb-3">
                <label for="example-text-input" class="form-control-label">Division Name</label>
                <input class="form-control" type="text" placeholder="Name" v-model="name" required />
              </div>
              <label for="example-text-input" class="form-control-label">Which IoT's do you want to add?</label>
              <div>
                <VueMultiselect v-model="iots_selected" :options="iotsList" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Pick at least one" label="name"
                  track-by="name" :preselect-first="false" />
              </div>
            </div>

          </div>
        </div>
        <div class="text-center">
          <argon-button :disabled="isCreateButtonDisabled" class="m-2" variant="gradient" color="primary" size="sm"
            @click="createDivision()">Create</argon-button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>

import ArgonButton from "@/components/ArgonButton.vue";
import VueMultiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.css";
import IotService from '../../services/IotService.js';
import DivisionsService from '../../services/DivisionsService.js';

export default {
  name: "create-division-modal-dialog",
  props: {
    show: Boolean
  },
  components: {
    ArgonButton,
    VueMultiselect,
  },
  data() {
    return {
      newDivision: null,
      name: "",
      iots_selected: "",
      iotsList: [],
    }
  },
  async mounted() {
    this.clear()
    this.iotsList = await IotService.getIots(localStorage.getItem("uri"))
  },
  methods: {
    clear() {
      this.newDivision = null
      this.name = "";
      this.iots_selected = "";
    },
    close() {
      this.$emit('close')
      this.clear()
    },
    async createDivision() {
      var aux = []
      for (var i = 0; i < this.iots_selected.length; i++) {
        aux.push(this.iots_selected[i]['name'])
      }

      this.newDivision = {
        name: this.name,
        iots: aux,
      }

      await DivisionsService.postCreateDivision(localStorage.getItem("uri"), this.name, aux)
      this.$emit("add-new-division", this.newDivision);
      this.close();
    },
  },
  computed: {
    isCreateButtonDisabled: function () {
      return !this.name || !this.iots_selected || this.iots_selected.length === 0;
    },
  },
}
</script>
<style>
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
  /* Adjust the value to control the roundness of the corners */
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

/* Custom CSS for transparent button */
.btn-transparent {
  background-color: transparent;
  border: none;
  color: #000 !important;
  box-shadow: none !important;
  padding-left: 3.25rem !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
  /* Adjust the color as needed */
}

/* Style for three dots */
.three-dots {
  font-size: 1.5rem;
  /* Adjust the size as needed */
}

/* Hide the default dropdown button arrow */
.btn-transparent::after {
  content: none;
}
</style>
  