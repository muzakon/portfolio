<template>
  <div class="absolute z-10 top-0 left-0 w-full bg-black p-4">
    <div class="flex items-center justify-end md:px-12">
      <div
        class="flex items-center gap-5"
        v-if="breakpoints.current().value.includes('md')"
      >
        <router-link
          to="/"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Home</router-link
        >
        <router-link
          :to="{ name: 'projects' }"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Projects</router-link
        >
        <router-link
          to="/experience"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Experience</router-link
        >
        <a
          href="https://github.com/muzakon/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/h.muzak/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
            />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M16.5 7.5l0 .01" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/hmuzak/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
            />
            <path d="M8 11l0 5" />
            <path d="M8 8l0 .01" />
            <path d="M12 16l0 -5" />
            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
          </svg>
        </a>
      </div>

      <div v-else class="cursor-pointer p-2" @click="showDrawer = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-menu-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 6h10" />
          <path d="M4 12h16" />
          <path d="M7 12h13" />
          <path d="M7 18h10" />
        </svg>
      </div>
    </div>

    <a-drawer
      v-if="!breakpoints.current().value.includes('md')"
      placement="right"
      :width="240"
      :open="showDrawer"
      @close="showDrawer = false"
      style="
        background-color: black;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      "
      :closable="false"
    >
      <div class="flex flex-col gap-5">
        <router-link
          to="/"
          exact
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Home</router-link
        >
        <router-link
          :to="{ name: 'projects' }"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Projects</router-link
        >
        <router-link
          to="/experience"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px]"
          >Experience</router-link
        >
        <a
          href="https://github.com/muzakon/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px] flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
            />
          </svg>
          <span class="ml-2"> Github </span>
        </a>
        <a
          href="https://www.instagram.com/h.muzak/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px] flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
            />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M16.5 7.5l0 .01" />
          </svg>
          <span class="ml-2"> Instagram </span>
        </a>
        <a
          href="https://www.linkedin.com/in/hmuzak/"
          target="_blank"
          class="text-[#bbb] hover:text-[#00dc82] cursor-pointer text-[14px] flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
            />
            <path d="M8 11l0 5" />
            <path d="M8 8l0 .01" />
            <path d="M12 16l0 -5" />
            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
          </svg>

          <span class="ml-2"> Linkedin </span>
        </a>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const showDrawer = ref(false);
</script>

<style scoped lang="less">
.router-link-active {
  color: #00dc82;
}
</style>
