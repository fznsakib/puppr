<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal" />

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Upload Image
        </p>

        <button class="delete" aria-label="close"
                @click="closeModal" />
      </header>

      <section class="modal-card-body">
        <div class="file is-boxed is-centered">
          <label class="file-label">
            <input class="file-input" type="file"
                   name="resume">

            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload" />
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>

          </label>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info">
          Save changes
        </button>
        <button class="button is-text">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadModal',
  created() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.closeModal()
    })
  },
  destroyed() {
    document.removeEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.closeModal()
    })
  },
  methods: {
    closeModal() {
      this.$emit('closeUploadModal')
    }
  }
}
</script>

<style scoped>
.modal-background {
  background-color: rgba(10, 10, 10, 0.55);
}

.modalFade-enter, .modalFade-leave-to {
  opacity: 0;
}

.modalFade-enter-active, .modalFade-leave-active {
  transition: opacity .5s;
}

</style>
