export const state = {
  notification: 2,
  messages: [
    {
      message: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
      time: '8:40 PM',
      img: 'Icon@3x.svg'
    },
    {
      message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
      time: '7:32 PM',
      img: 'Icon@3x.svg',
      tip: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
    },
    {
      message: 'Darika Samak uploaded 4 files on An option to search in current ',
      time: '6:02 PM',
      img: 'Icon@3x.svg',
      pictures: [
        {
          img: '1-1.jpg'
        },
        {
          img: '1-1.jpg'
        },
        {
          img: '1-1.jpg'
        },
        {
          img: '1-1.jpg'
        }
      ]
    }
  ]
}
export const mutations = {
  changeNotification (state, index: number):void {
    state.notification = index
  }
}
export const actions = {

}
export const getters = {
  notification (state):void {
    return state.notification
  },
  files (state):never[] {
    const imges = []
    for (let i = 0; i < state.messages.length; i++) {
      const img = state.messages[i].pictures
      if (img) {
        for (let j = 0; j < img.length; j++) {
          imges.push(img[j].img.split('.')[0] as never)
        }
      }
    }
    return imges
  }
}
