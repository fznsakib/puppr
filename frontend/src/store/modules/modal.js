export const namespaced = true

export const state = {
  isShowingUploadModal: false,
  isShowingImageModal: false
}

export const mutations = {
  SHOW_UPLOAD_MODAL: (state) => {
    state.isShowingUploadModal = true
    state.isShowingImageModal = false
  },
  HIDE_UPLOAD_MODAL: (state) => {
    state.isShowingUploadModal = false
  },
  SHOW_IMAGE_MODAL: (state) => {
    state.isShowingImageModal = true
    state.isShowingUploadModal = false
  },
  HIDE_IMAGE_MODAL: (state) => {
    state.isShowingImageModal = false
  }
}

export const actions = {

}

export const getters = {
  getShowingUploadModal: state => state.isShowingUploadModal,
  getShowingImageModal: state => state.isShowingImageModal
}
