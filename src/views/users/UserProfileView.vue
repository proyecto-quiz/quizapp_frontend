<script setup lang="ts">
import { UserResponse } from '@@/types-response-users';
import { useAttrs } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const router = useRouter();
const { user } = useAttrs() as { user: UserResponse };

async function handleSignOutClick() {
  await authStore.signOutAction(async () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('username');
    await router.push({ name: 'Home' });
  });
}
</script>

<template>
  <div class="container pb-5">
    <ul>
      <li class="text-4xl text-red-500">
        {{ user.email }}
      </li>
      <li>
        {{ user.username }}
      </li>
      <li class="font-semibold text-yellow-700">
        {{ user.role }}
      </li>
    </ul>
    <p class="leading-7 -tracking-tight">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio
      est hic ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos,
      rem sequi sint sunt veritatis voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio est hic
      ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos, rem
      sequi sint sunt veritatis voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.
    </p>

    <p class="leading-7 -tracking-tight">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio
      est hic ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos,
      rem sequi sint sunt veritatis voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio est hic
      ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos, rem
      sequi sint sunt veritatis voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.
    </p>
    <p class="leading-7 -tracking-tight">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio
      est hic ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos,
      rem sequi sint sunt veritatis voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad deserunt distinctio est hic
      ipsam non numquam officia officiis perferendis placeat, possimus provident quis quos, rem
      sequi sint sunt veritatis voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Accusantium ad deserunt distinctio est hic ipsam non numquam officia
      officiis perferendis placeat, possimus provident quis quos, rem sequi sint sunt veritatis
      voluptatibus voluptatum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
      ad deserunt distinctio est hic ipsam non numquam officia officiis perferendis placeat,
      possimus provident quis quos, rem sequi sint sunt veritatis voluptatibus voluptatum.
    </p>
    <button type="button" class="button--light" @click="router.push({ name: 'Home' })">
      <i class="bx bx-arrow-back self-center text-xl" />
    </button>
    <button title="Cerrar sesión" type="button" class="button--danger" @click="handleSignOutClick">
      <i class="bx bx-log-out-circle" /> Cerrar sesión
    </button>
  </div>
</template>
