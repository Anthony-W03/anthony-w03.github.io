let sfxMuted: boolean = $state(false)

export const sfx = {
  get sfxMuted() {
    return sfxMuted
  },

  set sfxMuted(val: boolean) {
    sfxMuted = val
  },
}
