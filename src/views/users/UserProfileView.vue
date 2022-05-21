<script setup lang="ts">
import { UserResponse } from '@@/types-response-users';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = inject<UserResponse>('user');
</script>

<template>
  <div class="container pb-5">
    <button type="button" class="button--light" @click="router.push({ name: 'Home' })">
      <i class="bx bx-arrow-back self-center text-xl" />
    </button>
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
  </div>
</template>
