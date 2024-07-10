<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div v-for="(division, index) in divisionList" :key="index" class="col-lg-3 col-md-6 col-12">
            <div>
              <division-card :division="division" :index="index" directionReverse @removeDivision="handleRemoveDivision"></division-card>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <create-division-card :newDivision="newDivision" @handleAddDivision="handleAddDivision" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DivisionCard from "./components/DivisionCard.vue"
import CreateDivisionCard from "./components/CreateDivisionCard.vue"
import DivisionService from "../services/DivisionsService.js"

export default {
  name: "divisions",
  data() {
    return {
      i: 0,
      newDivision: "",
      divisionList: [],
    };
  },
  async mounted() {
    this.getDivisions();
  },
  methods: {
    async getDivisions() {
      this.divisionList = await DivisionService.getDivisions(localStorage.getItem("uri"))
    },
    handleAddDivision(newDivision) {
      this.divisionList.push(newDivision)
    },
    handleRemoveDivision(index) {
      this.divisionList.splice(index,1)
      console.log(this.divisionList[this.divisionList.length-1])
    }
  },
  components: {
    DivisionCard,
    CreateDivisionCard,
  },
};
</script>
