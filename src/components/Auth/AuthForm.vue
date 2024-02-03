<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="card custom-card col-md-6 transparent-card">
        <div class="card-body">
          <h5 class="card-title gradient-title">
            {{
              formDetail.name !== "forget_password"
                ? formDetail.name.toUpperCase()
                : "Forget Password"
            }}
          </h5>
          <form class="p-4" @submit.prevent="handleSubmit">
            <!-- Your form fields go here -->
            <div class="form-group mb-3" v-if="formDetail.name === 'register'">
              <label for="userName">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="userName"
                placeholder="Enter your name"
                v-model="form.name"
              />
              <div class="pre-icon os-icon os-icon-user-male-circle"></div>
              <!-- error message -->
              <span class="text-danger" v-if="v$.name.$error">{{
                v$.name.$errors[0].$message
              }}</span>
            </div>

            <div
              class="form-group mb-3"
              v-if="
                formDetail.name === 'register' ||
                formDetail.name === 'login' ||
                formDetail.name === 'forget_password'
              "
            >
              <label for="exampleFormControlInput1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                v-model="form.email"
              />
              <span class="text-danger" v-if="v$.email.$error">{{
                v$.email.$errors[0].$message
              }}</span>
            </div>
            <div
              class="form-group mb-3"
              v-if="
                formDetail.name === 'register' || formDetail.name === 'login'
              "
            >
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
              {{
                formDetail.name !== "forget_password"
                  ? formDetail.name.toUpperCase()
                  : "Forget Password"
              }}
            </button>
          </form>
          <div class="container" v-if="formDetail.name === 'login'">
            <router-link
              :to="{ name: 'forgetPassword' }"
              class="d-flex align-items-center justify-content-center hover-effect right-arrow text-decoration-none"
            >
              Forget Password
            </router-link>
          </div>
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
const form = reactive({});
const isLoading = ref(false);
// Create a reactive "form" object to store the values of the form fields
onMounted(() => {
  if (formDetail.name) {
    switch (formDetail.name) {
      case "forget_password":
        form.value = {
          email: "",
        };
        break;
      case "login":
        form.value = {
          email: "",
          password: "",
        };
        break;
      default:
        form.value = {
          name: "",
          email: "",
          password: "",
        };
    }
  }
});

const rules = computed(() => {
  if (formDetail.name) {
    switch (formDetail.name) {
      case "forget_password":
        return {
          email: {
            required, // Email is required
            email, // Must be a valid email address
          },
        };
        break;
      case "login":
        return {
          email: {
            required, // Email is required
            email, // Must be a valid email address
          },
          password: {
            required, // Password is required
            minLength: minLength(8), // Password must have at least 8 characters
          },
        };
        break;
      default:
        return {
          name: { required }, // Name is required
          email: {
            required, // Email is required
            email, // Must be a valid email address
          },
          password: {
            required, // Password is required
            minLength: minLength(8), // Password must have at least 8 characters
          },
        };
    }
  }
});

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  let endpoint =
    formDetail.name !== "forget_password" ? formDetail.name : "forget-password";
  isLoading.value = true;
  const result = await v$.value.$validate();
  if (!result) {
    isLoading.value = false;
    return;
  }
  https
    .post(endpoint, form)
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
            (formDetail.name == "login") ? router.push("/dashboard") : router.push("/login");
            
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