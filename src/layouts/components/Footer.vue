<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="bx-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="https://www.facebook.com/yasolovest/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >noadvcxxi@gmail.com</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://www.facebook.com/yasolovest/"
        target="noopener noreferrer"
      >License</a>
      <a
        href="https://www.facebook.com/yasolovest/"
        target="noopener noreferrer"
      >More Themes</a>
      <a
        href="https://www.facebook.com/yasolovest/"
        target="noopener noreferrer"
      >Documentation</a>
    </span>
  </div>
</template>
