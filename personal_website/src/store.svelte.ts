let sfxMuted: boolean = $state(true)

export const sfx = {
  get sfxMuted() {
    return sfxMuted
  },

  set sfxMuted(val: boolean) {
    sfxMuted = val
  },
}
