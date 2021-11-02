let themes = [
  {
    name: 'default',
    bgColor: '#ddd',
    bgColorFront: '#fff',
    bgColorBack: '#ddd',
    textColor: '#fff',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'dark',
    bgColor: '#353535',
    bgColorFront: '#4f4f4f',
    bgColorBack: '#202020',
    textColor: '#efefef',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'gray',
    bgColor: '#2b373d',
    bgColorFront: '#445760',
    bgColorBack: '#222b30',
    textColor: '#e0e4e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'violetgray',
    bgColor: '#322e47',
    bgColorFront: '#544f71',
    bgColorBack: '#272337',
    textColor: '#e2e0e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'bluegray',
    bgColor: '#2a394c',
    bgColorFront: '#475d7b',
    bgColorBack: '#212d3b',
    textColor: '#e0e2e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'tealgray',
    bgColor: '#273c3f',
    bgColorFront: '#3f5f64',
    bgColorBack: '#1f3033',
    textColor: '#e0e4e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'violet',
    bgColor: '#462a68',
    bgColorFront: '#6d41a1',
    bgColorBack: '#3d255b',
    textColor: '#e3e0e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'ocean',
    bgColor: '#0d3562',
    bgColorFront: '#14539a',
    bgColorBack: '#0b2c51',
    textColor: '#e0e3e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'teal',
    bgColor: '#023a3e',
    bgColorFront: '#055b62',
    bgColorBack: '#012a2d',
    textColor: '#e0e6e6',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'forest',
    bgColor: '#18391a',
    bgColorFront: '#275d2b',
    bgColorBack: '#122b14',
    textColor: '#e0e6e0',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'rose',
    bgColor: '#6d1212',
    bgColorFront: '#a71c1c',
    bgColorBack: '#5c0f0f',
    textColor: '#e6e0e0',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  {
    name: 'magenta',
    bgColor: '#660d33',
    bgColorFront: '#a0144f',
    bgColorBack: '#560b2b',
    textColor: '#e6e0e2',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
  }
]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ themes });
  chrome.storage.sync.set({ selectedTheme: themes[3] });
  chrome.storage.sync.set({ isDark: false });
  chrome.storage.sync.set({ isMirror: false });
});
