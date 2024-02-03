<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="card custom-card col-md-6 transparent-card">
        <div class="card-body">
          <h5 class="card-title gradient-title">Update Password</h5>
          <form class="p-4" @submit.prevent="updatePassword">
            <div class="form-group mb-3">
              <label for="exampleFormControlPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleFormControlPassword1"
                placeholder="Password"
                v-model="form.password"
              />
              <span class="text-danger" v-if="v$.password.$error">{{
                v$.password.$errors[0].$message
              }}</span>
            </div>
            <button type="submit" class="btn btn-primary">
              Update Password
            </button>
          </form>
          <loading v-model:active="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template> 


<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import https from "../../axios";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useRouter, useRoute } from "vue-router";
const formDetail = defineProps({
  name: String,
});
const router = useRouter();
const route = useRoute();
const form = reactive({
  password: "",
});
const isLoading = ref(false);

const rules = computed(() => {
  console.log(route, "routes");
  return {
    password: {
      required,
      minLength: minLength(8),
    },
  };
});

const v$ = useVuelidate(rules, form);

async function updatePassword() {
  isLoading.value = true;
  const result = await v$.value.$validate();
  if (!result) {
    isLoading.value = false;
    return;
  }
  form.id = route.params.id;
  https
    .post('/update-password', form)
    .then((response) => {
      isLoading.value = false;
      let status = response.data.status;
      if (status) {
        let swalOption = {
          title: response.data.message,
          icon: "success",
        };

        if (formDetail.name !== "forget_password") {
          swalOption.confirmButtonText =
            formDetail.name == "login" ? "Dashboard ->" : "Go Login ->";
        }

        Swal.fire(swalOption).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      } else {
        Swal.fire({
          title: response.data.message,
          icon: "error",
          confirmButtonText: "Try again",
        }).then((result) => {
          if (result.isConfirmed) {
            form.password = "";
            router.push("/login");
          }
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}
</script>



<style scoped>
.custom-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.custom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.gradient-title {
  background: linear-gradient(
    45deg,
    #2193b0,
    #6dd5ed
  ); /* Adjust the colors as needed */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s ease-in-out;
}

.hover-effect:hover {
  color: #007bff; /* Change the color on hover as desired */
  cursor: pointer;
}

.right-arrow::after {
  content: "\2192"; /* Unicode character for right arrow */
  margin-left: 5px;
}

.transparent-card {
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Adjust the alpha value (0 to 1) for transparency */
}

.image-card {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>