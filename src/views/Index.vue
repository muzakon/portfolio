<template>
  <div>
    <div>
      <h1
        class="text-gray-200 text-[36px] title space-grotesk uppercase font-bold"
      >
        Hay, I'm Hasan >
      </h1>

      <div class="pt-4">
        <VueTyped
          :strings="[`I'm a fullstack developer.`]"
          :typeSpeed="50"
          :backSpeed="30"
          :showCursor="true"
          style="display: inline-block"
          :autoInsertCss="true"
          class="space-grotesk uppercase font-bold text-[20px] text-[#00dc82]"
        ></VueTyped>
      </div>

      <div class="text-[14px] pt-8 text-[#bbb] information">
        I bring a diverse skill set to the table, ranging from Docker and Python
        to JavaScript frameworks like VueJS and React. With experience across
        both Google Cloud Platform and AWS, as well as a solid background in
        both SQL and NoSQL databases, I’m equipped to tackle a wide range of
        development challenges.
      </div>

      <div class="text-[14px] pt-8 text-[#bbb] information">
        I hold a bachelor’s degree in Computer Engineering, which laid the
        foundation for my technical expertise and problem-solving abilities. My
        approach to development is both methodical and creative, and I enjoy
        diving into new technologies and tools to stay on the cutting edge of
        the field. Whether it's optimizing back-end systems or crafting engaging
        front-end experiences, I’m driven by a commitment to quality and
        innovation.
      </div>

      <div class="pt-8">
        <a
          href="#"
          class="bg-[#00dc82] text-black text-[13px] font-semibold px-4 py-2 rounded-[5px] hover:bg-[#00b068] inline-block transition duration-200"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-download"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 11l5 5l5 -5" />
              <path d="M12 4l0 12" />
            </svg>
            <span class="ml-2"> Download CV </span>
          </div>
        </a>

        <a
          href="#"
          class="text-[#00dc82] text-[13px] font-semibold px-4 py-2 rounded-[5px] hover:bg-[#00dc82] hover:text-black inline-block ml-2 transition duration-200"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mail"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
              />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <span class="ml-2"> Contact </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.information {
  line-height: 1.75;
}
</style>
